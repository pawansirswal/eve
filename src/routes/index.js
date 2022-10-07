import React from "react";
import { Redirect } from "react-router-dom";
import ContactUs from "../components/test/test";

// Authentication related pages
import LoginDel from "../pages/auth/logindel";
import Billhistory from "../pages/billingTable/billHistory";
// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Pages Calendar
import Calendar from "../pages/Calendar/Calendar";
import Firmmaster from "../pages/MasterT/FirmTable";
import DealerMaster from "../pages/MasterT/DealerMaster";
import NewsLetterTable from "../pages/MasterT/NewsLetterTable";
import NewLemailTab from "../pages/MasterT/newLetterEmailtab";

import ShareCompTable from "../pages/MasterT/ShareCompTable";
import PartyDetailComp from "../pages/MasterT/PartyDetailsTable";
import Analytics from "../pages/transaction/analytics";
import ViewDoc from "../pages/Dashboard/viewDoc";
import ViewTableComp from "../pages/Dashboard/viewTable";

import ViewTableBillingComp from "../pages/Dashboard/viewTableBilling";

// Forms
import FormElements from "../pages/Forms/FormElements";
import FormUpload from "../pages/Forms/FormUpload";

import FileUpload from "../pages/Forms/FormUpload";

//Tables
import BasicTables from "../pages/Tables/BasicTables";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

//Kanban Board

import BillingCustomerTable from "../pages/billingTable/billingCustomerTable";
import TransactionTable from "../pages/billingTable/transactionTable";
// import PartyDetailsComp from "../pages/Dashboard/PartyDetailsComp";
import Upload from "../components/test/test2";
import CsvUploadforNewsletter from "../pages/Forms/csvUploadforNewsletter";
import CsvUploadforNewsletterforEmail from "../pages/Forms/csvUploadEmail";
import PendingTransaction from "../pages/billingTable/pendingTransaction";
import SettledTransaction from "../pages/billingTable/settledTransaction";
import PostcardBackUpload from "../pages/Forms/postcardBackUpload";
import PostTempTable from "../pages/Dashboard/postTempTable";
import Vidcap from "../pages/auth/vidcap";
import DealerCommision from "../pages/Forms/dealerCommision";
import AddNews from "../pages/Forms/addNews";
import ReqPayment from "../pages/Dashboard/rePayment";
import LogsTable from "../pages/Logs/logsTable";
import IndTrans from "../pages/billingTable/indTrans";

const authProtectedRoutes = [
  // Tables

  { path: "/tables-basic", component: BasicTables },
  { path: "/uptest", component: Upload },
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },

  // Forms
  { path: "/form-elements", component: FormElements },
  { path: "/form-uploads", component: FormUpload },

  //login

  //Ecommerce
  { path: "/Firm-master", component: Firmmaster },
  { path: "/logs", component: LogsTable },
  { path: "/dealComm", component: DealerCommision },
  { path: "/addNews", component: AddNews },
  { path: "/dealer", component: DealerMaster },
  { path: "/Share-comp-master", component: ShareCompTable },
  { path: "/Party-details-master", component: PartyDetailComp },
  { path: "/analytics", component: Analytics },
  { path: "/csvUpload", component: FileUpload },
  { path: "/requestedPayments", component: ReqPayment },
  { path: "/customerDetailsForBilling", component: BillingCustomerTable },
  { path: "/transaciion", component: TransactionTable },
  { path: "/tranHistory", component: Billhistory },
  { path: "/view/:id", component: ViewDoc },
  { path: "/viewtablebilling:id", component: ViewTableBillingComp },
  { path: "/viewtable:id", component: ViewTableComp },
  { path: "/viewtrans/:id", component: IndTrans },

  { path: "/customerDb", component: CsvUploadforNewsletter },
  { path: "/customerDbforEmail", component: CsvUploadforNewsletterforEmail },
  { path: "/email", component: NewLemailTab },
  { path: "/user-master", component: NewsLetterTable },

  { path: "/pendingTransaction", component: PendingTransaction },
  { path: "/settledTransaction", component: SettledTransaction },
  { path: "/postcardBackUpload", component: PostcardBackUpload },
  { path: "/posTemp", component: PostTempTable },

  //chat

  //calendar
  { path: "/calendar", component: Calendar },

  { path: "/dashboard", component: Dashboard },

  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: LoginDel },
  { path: "/watch", component: Vidcap },
];

export { publicRoutes, authProtectedRoutes };
