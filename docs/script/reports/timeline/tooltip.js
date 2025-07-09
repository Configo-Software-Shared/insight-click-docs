var Tooltip = ( function () {

    var SCHEDULE = {
        h: 'Hourly',
        d: 'Daily',
        w: 'Weekly',
        n: 'Once',
        o: 'Other | Undefined',
        a: 'After another agent'
    };

    function render( s ) {
        return '<div class="panel panel-info">' + heading( s ) + settings( s ) + footer( s ) + '</div>';
    };

    function heading( s ) {
        return '<div class="panel-heading"><h3 class="panel-title">' + s.name + '</h3></div>';
    };

    function body( s ) {
        return '<div class="panel-body">Agent Type: not yet included DLL</div>';
    };

    function footer( s ) {
        return '<div class="panel-footer">* based on Agents Manager configuration</div>';
    };

    function schedule( s ) {
        var items = [
            { name: 'Server', value: s.server },
            { name: 'Instances', value: s.instances },
            { name: 'Type', value: s.trigger }
        ];

        return list( items );
    };

    function settings( s ) {
        var items = [
            { name: 'Servers', value: servers( s.servers ) },
            { name: 'Instance', value: ''.concat( s.instance + 1, " of ", s.instances ) },
            { name: 'Trigger', value: SCHEDULE[s.type] },
            { name: 'Gap', value: s.gap },
            { name: 'Schedule', value: moment( s.start ).format( 'ddd HH:mm:ss' ).concat( " &ndash; ", moment( s.finish ).format( 'ddd HH:mm:ss' ) ) },
            { name: 'Intervals', value: intervals( s.intervals ) },
            { name: 'Errors', value: list( s.errors ) },
            { name: 'Conflicts', value: list( s.conflicts ) },
            { name: 'Type', value: s.dll }
        ];

        if ( s.type === 'a' ) {
            //console.debug("AFTER ANOTHER AGENT", s);
            items.push( { name: 'Run After', value: triggers( s.triggers ) } );
        }
        return table( items );
    };

    function triggers( s ) {
        return list( s
                .map( function ( t ) { return t.agent.name; } ) );
    };

    function intervals( s ) {
        return list( s
            .map( function ( interval ) {
                return "at ".concat( moment( interval.start ).format( interval.start.day > 0 ? 'd[d]HH:mm' : 'HH:mm' ), ' for ', moment( interval.duration ).format( 'HH:mm' ) );
            } )
        );
    };

    function servers( s ) {
        return s.join( ", " );
    };

    function table( items ) {
        var table = [];
        table.push( '<table class="table table-bordered">' );
        items.forEach( function ( item ) { table.push( row( item ) ) } );
        table.push( '</table>' );
        return table.join( '' );
    }

    function row( s ) {
        return '<tr><td>' + s.name + '</td><td>' + s.value + '</td></tr>';
    }

    function list( items ) {
        var list = [];
        list.push( '<ul>' );
        items.forEach( function ( item ) { list.push( listItem( item ) ) } );
        list.push( '</ul>' );
        return list.join( '' );
    }

    function listItem( s ) {
        return '<li>' + s + '</li>';
    }

    return {
        render: render
    };

} )();
