var Timeline = ( function () {

    var SCHEDULE = {
        HOURLY: 'h',
        DAILY: 'd',
        WEEKLY: 'w',
        ONCE: 'n',
        OTHER: 'o',
        AFTER: 'a'
    };

    var data = [];
    var triggers = [];
    var queue = [];
    var now = new Date();
    var from = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1, 0, 0, 0, 0 );
    var to = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 8, 0, 0, 0, 0 );
    var tooltip = function ( schedule ) { return schedule };

    var options = {
        tooltip: { isHtml: true },
        legend: 'none'
        //        timeline: { singleColor: '#8d8' },
    };

    console.log( "Xoom" );
    google.charts.load( 'current', { 'packages': ['timeline'] } );

    var addRow = function ( row ) {
        data.push( row );
    }

    function prepareDataFromAgents( table ) {
        console.log( "prepare Data From Agents", data.length );

        // first process all the agents and extract the schedule.
        data.forEach( function ( agent ) {
            //console.log("Agent", agent);
            // extract the agents schedule
            processAgent( agent, table );
        } );

        processQueue( queue, table );
    };

    function processQueue( queue, table ) {
        //console.log("TRIGGERS", triggers);
        //onsole.log("QUEUE", queue);

        var completed = true;
        var count = 0;
        // the reason we perform do / while is we cannot take elements off the queue while we check it. assuming mutable queue.
        // instead we flag items as completed (active == true)
        do {
            // assuming there is nothing else to do after a first path over the queue
            console.info( "Starting queue", count );
            count++;

            completed = true;
            queue
                .filter( function ( schedule ) {
                    // filter out any agents that are in the trigger queue so we dont calcukate them again
                    return !schedule.active;
                } )
                .forEach( function ( schedule ) {
                    if ( triggers[schedule.triggerOn[0].agent.name] === undefined ) {
                        console.warn( "No match found for agent in triggers: ", schedule.triggerOn[0].agent.name );
                        //console.warn("RECORD: ", schedule);
                    }
                    else {
                        console.log( "Match found: ", schedule.triggerOn[0].agent.name );
                        var ttt = [];

                        schedule.trigger = SCHEDULE.AFTER;

                        triggers[schedule.triggerOn[0].agent.name].forEach( function ( trigger ) {
                            //console.log("TRIGGER", trigger);
                            //console.log("SCHEDULE", schedule);

                            // depeneding on the trigger we might have several instances after each trigger...
                            schedule.intervals.forEach( function ( interval ) {
                                //console.log("INTERVAL", interval);

                                var s = new Date( trigger.getFullYear(), trigger.getMonth(), trigger.getDate(), trigger.getHours() + interval.start.hour, trigger.getMinutes() + interval.start.minute, 0, 0 );
                                var f = new Date( s.getFullYear(), s.getMonth(), s.getDate(), s.getHours() + interval.duration.hour, s.getMinutes() + interval.duration.minute, 0, 0 );

                                for ( i = 0; i < schedule.instances; i++ ) {
                                    table.addRow( [schedule.server, schedule.name, tooltip( scheduleToInstance( schedule, s, f, i ) ), s, f] );
                                    //console.log("INTERVAL", [schedule.server, schedule.name, s, f]);
                                }

                                // for each triggered instance we need to add the triggered finish time to the list
                                ttt.push( f );
                            } );

                        } );
                        // add this new triggered after agent to the trigger list in case another agent is triggered on it
                        triggers[schedule.name] = ttt;
                        //console.log("ADDING new TRIGGER", ttt);
                        schedule.active = true;

                        // because we found a match we have to loop over the queue again to find any dependencies on this new trigger entry
                        completed = false;
                    }
                } );
        } while ( !completed ) // if the flag set to false continue looping over the queue array to find any other dependent agents.

    }

    function extractInterval( interval ) {
        return {
            start: {
                hour: parseInt( interval.start.substr( 0, 2 ) ),
                minute: parseInt( interval.start.substr( 3, 2 ) )
            },
            duration: {
                hour: parseInt( interval.duration.substr( 0, 2 ) ),
                minute: parseInt( interval.duration.substr( 3, 2 ) )
            }
        };
    };


    function processAgent( agent, table ) {

        agent.servers.pop();
        agent.onEndTrigger = agent.onEndTrigger === undefined ? [] : agent.onEndTrigger;
        agent.preventAfterErrors.pop();
        agent.preventConflicts.pop();
        agent.timeTrigger = agent.timeTrigger === undefined ? {} : agent.timeTrigger;

        var schedule = extractSchedule( agent );
        buildSchedule( schedule, table );

    }

    function scheduleToInstance( schedule, start, finish, instance ) {
        return {
            start: start,
            finish: finish,
            type: schedule.trigger,
            instance: instance,
            instances: schedule.instances,
            name: schedule.name,
            server: schedule.server,
            servers: schedule.servers,
            intervals: schedule.intervals,
            triggers: schedule.triggerOn,
            dll: schedule.dll,
            errors: schedule.errors,
            conflicts: schedule.conflicts,
            gap: schedule.gap
        };
    }

    function buildSchedule( schedule, table ) {

        switch ( schedule.trigger ) {

            case SCHEDULE.DAILY: // run once every number of days
                //console.log('DAILY', schedule);
                var trigger = [];
                for ( day = 0; day < 7; day++ ) {
                    var s = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 + day, schedule.start.getHours(), schedule.start.getMinutes(), 0, 0 );
                    var f = new Date( s.getFullYear(), s.getMonth(), s.getDate(), s.getHours() + schedule.intervals[0].duration.hour, s.getMinutes() + schedule.intervals[0].duration.minute, 0, 0 );
                    for ( i = 0; i < schedule.instances; i++ ) {
                        table.addRow( [schedule.server, schedule.name, tooltip( scheduleToInstance( schedule, s, f, i ) ), s, f] );
                    }
                    trigger.push( f );
                }
                triggers[schedule.name] = trigger;
                break;
            case SCHEDULE.WEEKLY: // use triggers to define weekly schedule
                var trigger = [];
                schedule.intervals.forEach( function ( interval ) {
                    var s = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 + interval.start.day, interval.start.hour, interval.start.minute, 0, 0 );
                    var f = new Date( s.getFullYear(), s.getMonth(), s.getDate(), s.getHours() + interval.duration.hour, s.getMinutes() + interval.duration.minute, 0, 0 );
                    for ( i = 0; i < schedule.instances; i++ ) {
                        table.addRow( [schedule.server, schedule.name, tooltip( scheduleToInstance( schedule, s, f, i ) ), s, f] );
                    }
                    trigger.push( f );
                } );
                triggers[schedule.name] = trigger;
                break;
            case SCHEDULE.HOURLY: // constantly run with execution gap
                //console.log('HOURLY', schedule);
                // in practice we only wanbt one long bar on the timeline to represent the continues run of the agent.
                for ( i = 0; i < schedule.instances; i++ ) {
                    table.addRow( [schedule.server, schedule.name, tooltip( scheduleToInstance( schedule, from, to, i ) ), from, to] );
                }
                break;
            case SCHEDULE.ONCE: // TODO
                break;
            case SCHEDULE.OTHER: // ignore
                //console.log('OTHER', schedule);
                if ( schedule.triggerOn === undefined ) {
                    // do some other work with this agent schedule... no trigger found
                    console.warn( "this agent missing a trigger agent to schedule from" );
                } else {
                    schedule.active = false;
                    queue.push( schedule );
                }
                break;
            default:
                console.warn( 'ERROR undefined trigger', schedule.trigger );
        }

    }

    function extractSchedule( agent ) {
        var schedule = {
            trigger: SCHEDULE.OTHER,
            triggerOn: agent.onEndTrigger,
            name: agent.name,
            server: agent.servers[0] + ( agent.enabled == '0' ? ' [disabled]' : '' ),
            servers: agent.servers,
            instances: parseInt( agent.instances )
        };

        console.debug( "AGENT", agent );
        if ( agent.timeTrigger.interval === undefined ) {
            schedule.start = new Date();
        } else {
            schedule.start = new Date( Date.parse( agent.timeTrigger.start ) );
            switch ( agent.timeTrigger.interval ) {
                case 'Daily': // Daily run use the number
                    schedule.trigger = SCHEDULE.DAILY;
                    schedule.day = parseInt( agent.timeTrigger.number );
                    break;
                case 'Weekly': // weekly run, use the intervals
                    schedule.trigger = SCHEDULE.WEEKLY;
                    break;
                case 'Hourly': // can be hourly or one time
                    schedule.hour = parseInt(agent.timeTrigger.number.substr(0, 2));
                    schedule.minute = parseInt(agent.timeTrigger.number.substr(3, 2));
                    schedule.trigger = SCHEDULE.HOURLY;
                    break;
                case 'OneTime':
                    schedule.trigger = SCHEDULE.ONCE;
                    break;
                default:
                    // not sure what to do here... dancing is a good idea...
            }
        }

        //console.log('Schedule', schedule);

        schedule.intervals = [];
        agent.intervals.forEach( function ( item ) {
            extractInterval( schedule, item );
        } );
        schedule.intervals.sort( function ( a, b ) { return a.start.day - b.start.day } ) //ACS order by day
        schedule.dll = agent.type;
        schedule.conflicts = agent.preventConflicts;
        schedule.errors = agent.preventAfterErrors;
        schedule.gap = agent.gap;

        return schedule;
    }

    function extractInterval( schedule, interval ) {
        if ( interval.start.substr( 1, 1 ) === 'd' ) {
            schedule.intervals.push(
                    {
                        start: {
                            day: parseInt( interval.start.substr( 0, 1 ) ),
                            hour: schedule.start.getHours(),
                            minute: schedule.start.getMinutes()
                        },
                        duration: {
                            hour: parseInt( interval.duration.substr( 0, 2 ) ),
                            minute: parseInt( interval.duration.substr( 3, 2 ) )
                        }
                    } );
        } else {
            schedule.intervals.push(
                    {
                        start: {
                            day: 0,
                            hour: parseInt( interval.start.substr( 0, 2 ) ),
                            minute: parseInt( interval.start.substr( 3, 2 ) )
                        },
                        duration: {
                            hour: parseInt( interval.duration.substr( 0, 2 ) ),
                            minute: parseInt( interval.duration.substr( 3, 2 ) )
                        }
                    } );
        }
    };

    var draw = function ( options ) {
        console.log( "Draw", options );
        tooltip = options.tooltip.render;
        google.charts.setOnLoadCallback( drawCallback );
    };

    function drawCallback() {
        console.log( "Init" );
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn( { type: 'string', id: 'Position' } );
        dataTable.addColumn( { type: 'string', id: 'Name' } );
        dataTable.addColumn( { type: 'string', role: 'tooltip', p: { html: true } } );
        dataTable.addColumn( { type: 'date', id: 'Start' } );
        dataTable.addColumn( { type: 'date', id: 'End' } );

        // call any data preperations
        //dataTable.addRow(["Legend", "Week", null, from, to]);
        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        for ( i = 0 ; i < 7; i++ ) {
            var s = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1 + i, 0, 0, 0, 0 );
            var f = new Date( now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 2 + i, 0, 0, 0, 0 );
            dataTable.addRow( ["Legend", days[i], null, s, f] );
        }
        prepareDataFromAgents( dataTable );

        console.log( "All data is ready for rendering!" );

        // draw the "@$%#!^" chart after all DATA was loaded and interprted
        var container = document.getElementById( 'chart' );
        var chart = new google.visualization.Timeline( container );
        chart.draw( dataTable, options );

        console.log( "Draw callback completed" );
    };

    // public API
    return {
        addAgent: addRow,
        draw: draw
    };

} )();