const DOT_CONTENT = `digraph scheme {
  rankdir = LR;
  overlap = false;
  node [shape = rectangle];

  subgraph cluster1 {
    label = "Legend";
    "Allow Status Change" -> "All Users";
    "Allow Status Change" -> "Specific Users" [ label = "User1, User2", color = "#4444cc", fontcolor = "#4444cc" ];
    "Allow Create In Status" [ color = "#44aa44" ];
    "Allow Delete In Status" [ fontcolor = "#cc2222" ];
    "Default Status" [ shape = Mdiamond ];
    }

  subgraph cluster2 {
    label = "Tier 1 Audits [FSMGlobalForms]";
    "cluster2.Closed" [label = "Closed", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster2.Completed" [label = "Completed", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster2.In Progress" [label = "In Progress", color = "#44aa44", shape = Mdiamond];
    "cluster2.Cancelled" [label = "Cancelled", fontcolor = "#cc2222"];
    "cluster2.Closed" -> "cluster2.Completed" [ label = "u2l@marathonp, k@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster2.Completed" -> "cluster2.Closed";
    "cluster2.Completed" -> "cluster2.In Progress";
    "cluster2.In Progress" -> "cluster2.Cancelled";
    "cluster2.In Progress" -> "cluster2.Closed";
    "cluster2.In Progress" -> "cluster2.Completed";
  }

  subgraph cluster3 {
    label = "Task Status Flow [Task]";
    "cluster3.Cancelled" [label = "Cancelled", fontcolor = "#cc2222"];
    "cluster3.Delete" [label = "Delete", fontcolor = "#cc2222"];
    "cluster3.Open" [label = "Open", color = "#44aa44", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster3.Completed" [label = "Completed", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster3.Accepted" [label = "Accepted"];
    "cluster3.Travel" [label = "Travel"];
    "cluster3.Acknowledged" [label = "Acknowledged"];
    "cluster3.On Hold" [label = "On Hold", color = "#44aa44"];
    "cluster3.On-Site" [label = "On-Site"];
    "cluster3.Remote" [label = "Remote"];
    "cluster3.Scheduled" [label = "Scheduled"];
    "cluster3.Vendor Contacted" [label = "Vendor Contacted"];
    "cluster3.Rejected" [label = "Rejected"];
    "cluster3.Incomplete" [label = "Incomplete", fontcolor = "#cc2222"];
    "cluster3.Dispatched" [label = "Dispatched"];
    "cluster3.On-Device" [label = "On-Device"];
    "cluster3.Megatask Breakout" [label = "Megatask Breakout"];
    "cluster3.Partially Completed" [label = "Partially Completed"];
    "cluster3.Suspend" [label = "Suspend"];
    "cluster3.Open" -> "cluster3.Completed" [ label = "BAK Field Resource, BAK Scheduler, SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Accepted" -> "cluster3.Travel" [ label = "TMS Admin, TMS Field Resource, TMS Technical Administrator and 2 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Acknowledged" -> "cluster3.On-Site" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Acknowledged" -> "cluster3.Remote" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Acknowledged" -> "cluster3.Scheduled";
    "cluster3.Acknowledged" -> "cluster3.Travel";
    "cluster3.Acknowledged" -> "cluster3.Vendor Contacted" [ label = "ORB Maintenance Scheduler, ORB Scheduler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Accepted" -> "cluster3.Cancelled" [ label = "background@marathonp, TMS Admin, TMS Technical Administrator", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Accepted" -> "cluster3.Rejected" [ label = "TMS Admin", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Acknowledged" -> "cluster3.Incomplete" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Travel" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler and 8 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Incomplete" -> "cluster3.Cancelled" [ label = "background@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Device" -> "cluster3.Completed" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler and 5 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Device" -> "cluster3.Travel" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler and 10 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.On Hold" [ label = "background@marathonp, BAK Scheduler, ORB Field Resource and 3 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Cancelled" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Cancelled" -> "cluster3.Open" [ label = "MJC@MarathonP, AMS@MarathonP, B4N@MarathonP and 32 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.Cancelled" [ label = "background@marathonp, TMS Admin, TMS Exception Handler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.On-Site" [ label = "hbu@marathonp, k@marathonp, ke9@marathonp and 2 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.Scheduled" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.Travel" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Cancelled" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Incomplete" -> "cluster3.On-Site" [ label = "ORB Scheduler, SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Megatask Breakout" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Partially Completed" [ label = "EF Scheduler, Field Resource, kSupport and 3 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Cancelled" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Remote" -> "cluster3.Megatask Breakout" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Travel" -> "cluster3.Acknowledged" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 4 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Travel" -> "cluster3.Cancelled" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On Hold" -> "cluster3.Cancelled";
    "cluster3.On-Device" -> "cluster3.Cancelled" [ label = "BAK Field Resource, BAK Scheduler, Field Resource, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.Cancelled" [ label = "background@marathonp, BAK Field Resource, BAK Scheduler and 6 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Open" [ label = "background@marathonp, BAK Field Resource, BAK Maintenance Scheduler and 13 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.On-Site" [ label = "ORB Field Resource, ORB Scheduler, PER - Scheduler and 2 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Accepted" -> "cluster3.Completed" [ label = "background@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Completed" [ label = "BAK Field Resource, BAK Scheduler, DIX@MarathonP and 7 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Completed" [ label = "BAK Field Resource, BAK Scheduler, EF Scheduler and 7 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.On-Site" [ label = "BAK Field Resource, BAK Scheduler, SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Cancelled" -> "cluster3.Completed" [ label = "hbu@marathonp, KE9@MarathonP, TMS Admin, TMS Exception Handler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Vendor Contacted" [ label = "ORB Maintenance Scheduler, ORB Scheduler, SOTenantAdmins, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Accepted" [ label = "TMS Admin, TMS Field Resource, TMS Technical Administrator and 2 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Acknowledged" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 6 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.On-Site" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 11 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Remote" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Dispatched" -> "cluster3.Scheduled";
    "cluster3.Dispatched" -> "cluster3.Vendor Contacted" [ label = "ORB Maintenance Scheduler, ORB Scheduler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Open" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Incomplete" -> "cluster3.On-Site" [ label = "u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Incomplete" -> "cluster3.Completed" [ label = "hbu@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Incomplete" -> "cluster3.Open" [ label = "hbu@marathonp, k@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Completed" [ label = "hbu@marathonp, TMS Technical Administrator", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.On-Site" [ label = "hbu@marathonp, k@marathonp, KE9@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Megatask Breakout" -> "cluster3.Completed";
    "cluster3.Megatask Breakout" -> "cluster3.Incomplete";
    "cluster3.On-Device" -> "cluster3.Dispatched";
    "cluster3.On Hold" -> "cluster3.Cancelled";
    "cluster3.On Hold" -> "cluster3.Completed";
    "cluster3.On Hold" -> "cluster3.Incomplete";
    "cluster3.On Hold" -> "cluster3.Open";
    "cluster3.On-Device" -> "cluster3.Acknowledged";
    "cluster3.On-Device" -> "cluster3.On-Site" [ label = "Q8D@MarathonP, BAK Field Resource, BAK Maintenance Scheduler and 11 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Device" -> "cluster3.Remote" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Device" -> "cluster3.Scheduled";
    "cluster3.On-Site" -> "cluster3.Acknowledged" [ label = "ORB Maintenance Scheduler, ORB Scheduler, SOTenantMCATUsers, SOTenantPERUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Completed";
    "cluster3.On-Site" -> "cluster3.Incomplete" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 9 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Travel" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 8 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.On-Site" -> "cluster3.Vendor Contacted" [ label = "ORB Maintenance Scheduler, ORB Scheduler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.Accepted" [ label = "background@marathonp, TMS Admin, TMS Vendor Dispatch Only, TMS Vendor Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.Acknowledged";
    "cluster3.Partially Completed" -> "cluster3.Completed";
    "cluster3.Partially Completed" -> "cluster3.Incomplete";
    "cluster3.Rejected" -> "cluster3.Cancelled";
    "cluster3.Rejected" -> "cluster3.Completed" [ label = "BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Rejected" -> "cluster3.On Hold" [ label = "ORB Field Resource, ORB Scheduler, PER - Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Rejected" -> "cluster3.Open";
    "cluster3.Remote" -> "cluster3.Cancelled" [ label = "BAK Field Resource, BAK Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Remote" -> "cluster3.Completed";
    "cluster3.Remote" -> "cluster3.Incomplete" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 6 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Remote" -> "cluster3.Travel" [ label = "BAK Field Resource, BAK Maintenance Scheduler, BAK Scheduler and 7 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Accepted" [ label = "TMS Admin", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Acknowledged" [ label = "background@marathonp, BAK Maintenance Scheduler, BAK Scheduler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Scheduled" -> "cluster3.Dispatched";
    "cluster3.On-Site" -> "cluster3.Scheduled" [ label = "U70@MarathonP, SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.Scheduled" [ label = "k@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Completed" -> "cluster3.Scheduled" [ label = "k@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Open" -> "cluster3.Rejected" [ label = "TMS Vendor Dispatch Only, TMS Vendor Scheduler", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Travel" -> "cluster3.Completed" [ label = "BAK Field Resource, BAK Scheduler, ORB Field Resource and 4 more", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Travel" -> "cluster3.On-Site";
    "cluster3.Travel" -> "cluster3.Remote" [ label = "SOTenantBAKUsers", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Vendor Contacted" -> "cluster3.Acknowledged" [ label = "ORB Maintenance Scheduler, ORB Scheduler, SOTenantAdmins, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster3.Vendor Contacted" -> "cluster3.On-Site" [ label = "ORB Maintenance Scheduler, ORB Scheduler, u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
  }

  subgraph cluster4 {
    label = "Service Request Transitions [FSMRequest]";
    "cluster4.Done" [label = "Done", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster4.New" [label = "New", color = "#44aa44", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster4.Submitted" [label = "Submitted", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster4.Cancelled" [label = "Cancelled", fontcolor = "#cc2222"];
    "cluster4.Assigned" [label = "Assigned"];
    "cluster4.In Progress" [label = "In Progress"];
    "cluster4.Assigned" -> "cluster4.In Progress";
    "cluster4.Submitted" -> "cluster4.Assigned";
    "cluster4.Done" -> "cluster4.Cancelled" [ label = "AB4@MarathonP, LND@MarathonP", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster4.Assigned" -> "cluster4.Cancelled";
    "cluster4.Assigned" -> "cluster4.Done";
    "cluster4.In Progress" -> "cluster4.Cancelled";
    "cluster4.In Progress" -> "cluster4.Done";
    "cluster4.New" -> "cluster4.Cancelled";
    "cluster4.New" -> "cluster4.Submitted";
    "cluster4.Submitted" -> "cluster4.Cancelled";
    "cluster4.Submitted" -> "cluster4.Done";
    "cluster4.Assigned" -> "cluster4.Submitted";
    "cluster4.In Progress" -> "cluster4.Submitted";
  }

  subgraph cluster5 {
    label = "Package Status Flow [PodPackage]";
    "cluster5.Uploaded" [label = "Uploaded", color = "#44aa44", shape = Mdiamond];
    "cluster5.Deployed" [label = "Deployed"];
    "cluster5.PendingRemoval" [label = "PendingRemoval"];
    "cluster5.ReviewRequested" [label = "ReviewRequested"];
    "cluster5.Verified" [label = "Verified"];
    "cluster5.PendingDeployment" [label = "PendingDeployment"];
    "cluster5.Deployed" -> "cluster5.PendingRemoval";
    "cluster5.Uploaded" -> "cluster5.ReviewRequested";
    "cluster5.Verified" -> "cluster5.PendingDeployment";
  }

  subgraph cluster6 {
    label = "NotificationSAP Status [BackReporting]";
    "cluster6.Pending" [label = "Pending", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster6.Created" [label = "Created", fontcolor = "#cc2222"];
    "cluster6.Pending" -> "cluster6.Created";
  }

  subgraph cluster7 {
    label = "MROWrkPln Status [MROWrkPln]";
    "cluster7.Pending" [label = "Pending", shape = Mdiamond];
    "cluster7.Created" [label = "Created"];
    "cluster7.Pending" -> "cluster7.Created";
  }

  subgraph cluster8 {
    label = "Equipment Info Status Rules [EquipmentInfo]";
    "cluster8.Equipment Movement" [label = "Equipment Movement", color = "#44aa44"];
    "cluster8.In Progress" [label = "In Progress", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster8.New" [label = "New", color = "#44aa44"];
    "cluster8.SAP" [label = "SAP", color = "#44aa44"];
    "cluster8.Update" [label = "Update", fontcolor = "#cc2222"];
    "cluster8.Cancelled" [label = "Cancelled", fontcolor = "#cc2222"];
    "cluster8.Confirmed" [label = "Confirmed"];
    "cluster8.Rejected" [label = "Rejected"];
    "cluster8.Remove" [label = "Remove"];
    "cluster8.Revisit" [label = "Revisit"];
    "cluster8.Uploaded (SAP)" [label = "Uploaded (SAP)"];
    "cluster8.Update" -> "cluster8.Confirmed";
    "cluster8.Update" -> "cluster8.In Progress" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Update" -> "cluster8.New" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Update" -> "cluster8.Rejected";
    "cluster8.Update" -> "cluster8.Remove";
    "cluster8.Update" -> "cluster8.Revisit";
    "cluster8.Update" -> "cluster8.Uploaded (SAP)";
    "cluster8.Confirmed" -> "cluster8.Rejected";
    "cluster8.Confirmed" -> "cluster8.Update";
    "cluster8.Confirmed" -> "cluster8.Uploaded (SAP)";
    "cluster8.In Progress" -> "cluster8.Cancelled";
    "cluster8.In Progress" -> "cluster8.Update";
    "cluster8.In Progress" -> "cluster8.Remove";
    "cluster8.New" -> "cluster8.Cancelled";
    "cluster8.New" -> "cluster8.Confirmed";
    "cluster8.New" -> "cluster8.Rejected";
    "cluster8.New" -> "cluster8.Revisit";
    "cluster8.New" -> "cluster8.Uploaded (SAP)";
    "cluster8.Rejected" -> "cluster8.Cancelled";
    "cluster8.Rejected" -> "cluster8.Confirmed";
    "cluster8.Rejected" -> "cluster8.Remove";
    "cluster8.Rejected" -> "cluster8.Revisit";
    "cluster8.Remove" -> "cluster8.Cancelled" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Remove" -> "cluster8.Confirmed";
    "cluster8.Remove" -> "cluster8.Rejected";
    "cluster8.Remove" -> "cluster8.Revisit";
    "cluster8.Remove" -> "cluster8.Uploaded (SAP)";
    "cluster8.Revisit" -> "cluster8.Cancelled" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Revisit" -> "cluster8.Confirmed";
    "cluster8.Revisit" -> "cluster8.In Progress" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Revisit" -> "cluster8.Rejected";
    "cluster8.Revisit" -> "cluster8.Remove";
    "cluster8.Revisit" -> "cluster8.Uploaded (SAP)";
    "cluster8.Update" -> "cluster8.Cancelled" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Confirmed" -> "cluster8.Remove" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.Rejected" -> "cluster8.Remove" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster8.SAP" -> "cluster8.New" [ label = "SOTenantAdmins", color = "#4444cc", fontcolor = "#4444cc" ];
  }

  subgraph cluster9 {
    label = "Default AbsenceRequest Status Flow [AbsenceRequest]";
    "cluster9.Approved" [label = "Approved", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster9.Declined" [label = "Declined", fontcolor = "#cc2222"];
    "cluster9.Pending" [label = "Pending", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster9.Approved" -> "cluster9.Declined";
    "cluster9.Declined" -> "cluster9.Approved";
    "cluster9.Pending" -> "cluster9.Approved";
    "cluster9.Pending" -> "cluster9.Declined";
  }

  subgraph cluster10 {
    label = "DC Form Approval [FSMDCWorkflow]";
    "cluster10.New" [label = "New", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster10.Accepted" [label = "Accepted", fontcolor = "#cc2222"];
    "cluster10.Completed" [label = "Completed", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster10.In Progress" [label = "In Progress", color = "#44aa44", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster10.Submitted" [label = "Submitted", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster10.Rejected" [label = "Rejected", fontcolor = "#cc2222"];
    "cluster10.Accepted" -> "cluster10.Completed";
    "cluster10.In Progress" -> "cluster10.Submitted";
    "cluster10.New" -> "cluster10.Completed";
    "cluster10.New" -> "cluster10.Submitted" [ label = "u2l@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
    "cluster10.Rejected" -> "cluster10.In Progress";
    "cluster10.Rejected" -> "cluster10.Submitted";
    "cluster10.Submitted" -> "cluster10.Accepted";
    "cluster10.Submitted" -> "cluster10.Completed";
    "cluster10.Submitted" -> "cluster10.In Progress";
    "cluster10.Submitted" -> "cluster10.Rejected";
  }

  subgraph cluster11 {
    label = "D&amp;C Protocol [FSMGlobalFormsDC]";
    "cluster11.Completed" [label = "Completed", color = "#44aa44", fontcolor = "#cc2222"];
    "cluster11.In Progress" [label = "In Progress", color = "#44aa44", fontcolor = "#cc2222", shape = Mdiamond];
    "cluster11.Cancelled" [label = "Cancelled", fontcolor = "#cc2222"];
    "cluster11.Closed" [label = "Closed", fontcolor = "#cc2222"];
    "cluster11.Completed" -> "cluster11.Closed";
    "cluster11.Completed" -> "cluster11.In Progress";
    "cluster11.In Progress" -> "cluster11.Cancelled";
    "cluster11.In Progress" -> "cluster11.Closed";
    "cluster11.In Progress" -> "cluster11.Completed";
    "cluster11.Closed" -> "cluster11.Completed" [ label = "k@marathonp", color = "#4444cc", fontcolor = "#4444cc" ];
  }

  subgraph cluster12 {
    label = "BAK Handovers Status [FSMHandovers]";
    "cluster12.In Progress" [label = "In Progress", color = "#44aa44", shape = Mdiamond];
    "cluster12.Accepted" [label = "Accepted"];
    "cluster12.Rejected" [label = "Rejected"];
    "cluster12.Completed" [label = "Completed"];
    "cluster12.In Progress" -> "cluster12.Accepted";
    "cluster12.In Progress" -> "cluster12.Rejected";
    "cluster12.Rejected" -> "cluster12.In Progress";
    "cluster12.Accepted" -> "cluster12.Completed";
  }

  subgraph cluster13 {
    label = "BAK Handover Actions Status [FSMHandoversActions]";
    "cluster13.New" [label = "New", color = "#44aa44", shape = Mdiamond];
    "cluster13.In Progress" [label = "In Progress"];
    "cluster13.Completed" [label = "Completed"];
    "cluster13.Cancelled" [label = "Cancelled"];
    "cluster13.New" -> "cluster13.In Progress";
    "cluster13.In Progress" -> "cluster13.Completed";
    "cluster13.New" -> "cluster13.Cancelled";
    "cluster13.In Progress" -> "cluster13.Cancelled";
  }
}`;