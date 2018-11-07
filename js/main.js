var debug = false;
// ============= Global variables
 var api_url = "http://41.214.31.141/meaportal/api/";
// var api_url = "http://124.153.94.106:8081/api/";/* DataCenter Server */
//var api_url = "https://mobapps.dpworldsokhna.com/api/";/* Sokhna Server */
//var help_url = "https://196.219.234.87/help/sokhna.pdf";/* Sokhna Server */
//var api_url = "http://41.214.31.142/MEAPortal/api/";/* local Server */,
var version = "1";
var LocationId = "1";
var Language = 1;
var latitude;
var longitude;
var platform;
var BLStatusFlag = 0;
var tempStatus = "";
var MachId;
var UserNotificationStatus = "";
var locale;
var errMessage;
// ********************Login data********************//
var EmployeeName;
var PasswordChangeDate;
var UserStatus;
var JobId;
var LocationId;
var CustomerId;
var CustomerRefCode;
var CustomerType;
var MenuId;
var settingMobileNo;
var settingEmailId;
var SessionId;
var AuthenticationKey;
var FullName;
var userName;
var userPass;
var BLGroupId = 0;
var LoginStatus = false;
var paramContainerId;
var blStatusCommodity;
var BLStatusNumber = -1;
var CurPageSwipe = "";
var BLNo;
var aTable;
var BLNoArr = [];
var changePasswordLink = '#dvChangePassword';
var currentCustomerName;
var deviceRegistrationId;
var flgProformEstimate;
var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners

	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		$.mobile.defaultPageTransition = 'slide';
		$(window).on('hashchange', $.proxy(this.route, this));
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler

	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {

		/** ************** Device details ***************** */
		platform = device.platform;
		if (platform === "iOS") {
			$('.platform').css('margin-top', '20px');
		}


		if (platform === "Android" || platform === "android" ){
			try {
				var pushNotification = window.plugins.pushNotification;
				pushNotification.register(app.successHandler, app.errorHandler,
						{
							"senderID" : "823858788098",
							"ecb" : "app.onNotificationGCM"
						});

			} catch (e) {
				// TODO: handle exception
				alert(e);
			}
		}

		

	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	},
	// result contains any message sent from the plugin call
	successHandler : function(result) {
		// alert('Callback Success! Result = '+result);
	},
	errorHandler : function(error) {
		alert(error);
	},
	onNotificationGCM : function(e) {

		switch (e.event) {
		case 'registered':
			if (e.regid.length > 0) {
				console.log("Regid " + e.regid);
				deviceRegistrationId = e.regid;
//				 alert('registration id = '+e.regid); 
			}
			break;

		case 'message':
			// this is the actual push notification. its format depends on the
			// data model from the push server
		//	navigator.notification.alert(e.message, null,
			//		"Notification", locale.AlertOK);

			//alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
			break;

		case 'error':
			alert('GCM error = ' + e.msg);
			break;

		default:
			alert('An unknown GCM event has occurred');
			break;
		}
	},

	route : function() {
		document.removeEventListener("backbutton", backEvent, false);
		var hash = window.location.hash;

		console.log("Route: fired for " + hash);
		if (hash.indexOf("#") < 0) {
			doLogout();
			return;
		} else if (hash === '#dvHomePage') {
			$('#BLDustbinHome').hide();
			BLNoArr.length = 0;
			initHomeScreen();
			return;
		} else if (hash === '#dvBLRegistration') {
			initBLRegistration();
			return;
		} else if (hash === '#dvBLPaymentPending') {
			ShowPaymentPendingList();
			return;
		} else if (hash === '#dvMyBLList') {
			$('#BLDustbin').hide();
			BLNoArr.length = 0;
			initMYBLs();
			return;
		} else if (hash === '#dvLegalDetails') {
			initLegalDetails();
			return;
		} else if (hash === '#dvProformaInvoice') {
			$('#txtProformaBLNumber').attr("placeholder",
					locale.lblProformaBLNumber);
			if ($('#txtProformaBLNumber').val() != "") {
				showProformaRequestDetails();
			}
			// showProformaRequestScreen();
			return;
		} else if (hash === '#dvContainerInfoPage') {
			initContainerInfo();
			return;
		} else if (hash === '#dvContainerScreen') {
			/*
			 * loadContainers(); return;
			 */
		} else if (hash === '#dvBLStatus') {
			if (BLStatusFlag == 1) {
				showBLStatus();
			} else {
				initBLStatus();
			}
			return;
		} else if (hash === "#dvInvoicePage") {
			initInvoiceScreen();
			return;
		} else if (hash === "#dvVessel") {
			initVessele();
			return;
		} else if (hash === "#dvVesseleInfo") {
			initVesseleInfo();
			return;
		} else if (hash === "#dvSetting") {
			initSetting();
			return;
		} else if (hash === "#dvBLRegistration&ui-state=dialog") {
			$('#txtBLRegBLNo').focus().select();
			//SoftKeyboard.show();
		} else if (hash === "#dvHomePage&ui-state=dialog") {
			$('#txtBLChangeCustomer').focus().select();
			$('#txtBLRegBLNoHome').focus().select();
			//SoftKeyboard.show();
		} else if (hash === "#dvMyBLList&ui-state=dialog") {
			$('#txtBLRegBLNoMyBL').focus().select();

			//SoftKeyboard.show();
		} else if (hash === "#&ui-state=dialog") {

			$('#txtChangePasswordOldPassword').focus().select();
			//SoftKeyboard.show();
		} else if(hash === '#dvAdminPage'){
			initAdminPage();
		} else if(hash === '#dvTemplate'){
			initTemplate();
		}
	},

};




app.initialize();
var paramContainerList;
function loadContainers(BLId) {

	var containerDetails = {
		"BlId" : BLId,
		"UserName" : userName,
		"LocationId" : LocationId
	}

	$.ajax({
		url : api_url + 'ContainerList/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(containerDetails),
		success : function(response) {
			var jsonResponse = StringToJson(response);
			paramContainerList = jsonResponse.list;
			var liTemplate = Handlebars.compile($("#tplContainerList").html());
			$('#ulContainersList').html(liTemplate({
				contList : jsonResponse
			}));
			$('#ulContainersList').height($(window).height() - 45);
			setScreenLabels();
		}
	});
}

function setScreenLabels() {

	$('#btn-tab-ContBasic').text(locale.lblContBasic);
	$('#btn-tab-ContHistory').text(locale.lblContHistory);
	$('#btn-tab-ContDocs').text(locale.lblContDocs);
	$('#btn-tab-ContHaz').text(locale.lblContHaz);
	$('#btn-tab-ContOog').text(locale.lblContOog);

	$('.lblContainerNo').text(locale.lblContainerNo);
	$('.lblCommodity').text(locale.ContainerCommodity);
	$('.lblCycle').text(locale.ContainerCYCLE);

	$('#lblODCINfoTitle').text(locale.ODCINFOTitle);
	$('#lblODCHeight').text(locale.ODCINFOHeight);
	$('#lblODCLeft').text(locale.ODCINFOLeft);
	$('#lblODCRight').text(locale.ODCINFORight);
	$('#lblODCFront').text(locale.ODCINFOFront);

	$('#lblHAZINfoTitle').text(locale.HAZInfoTitle);
	$('#lblIMONo').text(locale.HAZInfoIMO);
	$('#lblUNNo').text(locale.HAZInfoUN);

	$('#lblDocumentationTitle').text(locale.DoucumentationTitle);
	$('#lblDoucumentationWeight').text(locale.DoucumentationWeight);
	$('#lblDoucumentationBL').text(locale.DoucumentationBLNo);
	$('#lblDoucumentationPickupDate').text(locale.DoucumentationPickupDate);
	// $('#lblDoucumentationDO').text(locale.DoucumentationDO);
	$('#lblDoucumentationDOValid').text(locale.DoucumentationDOValid);

	$('#lblContainerHistoryTitle').text(locale.ContainerHistoryTitle);
	$('.lblDischargeTally').text(locale.ContainerHistoryDischargeTally);
	$('.lblCustomInspection').text(locale.ContainerHistoryCustomInsp);
	$('.lblVesselArrival').text(locale.ContainerHistoryVesselArrival);
	$('#lblContDoNo').text(locale.ContDONo);
	$('#lblContainerInfoVessel').text(locale.ContainerInfoVessel);
	$('#lblContainerInfoVCN').text(locale.ContainerInfoVCN);
	$('#lblContainerInfoPOL').text(locale.ContainerInfoPOL);
	$('#lblContainerInfoFPD').text(locale.ContainerInfoFPD);
	$('#lblContainerInfoPOD').text(locale.ContainerInfoPOD);

	$('#lblContainerInfoShippingLine').text(locale.ContainerInfoShippingLine);
	$('#lblContainerInfoShippingAgent').text(locale.ContainerInfoShippingAgent);
	$('#lblContainerInfoInTime').text(locale.ContainerInfoInTime);
	$('#lblContainerInfoOutTime').text(locale.ContainerInfoOutTime);
	$('#lblContainerInfoStatus').text(locale.ContainerInfoStatus);
	$('#lblContainerHoldStatus').text(locale.ContainerHoldStatus);
}

function showProformaRequestScreen() {
	window.lcation = "#dvProformaInvoice";
}

function initLegalDetails() {
	$('#lblLegalDetailsTitle').text(locale.LegalDetailTitle);
}

function initMYBLs() {

	var myBLDetails = {
		"UserName" : userName,
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'MyBlResult/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(myBLDetails),
		success : function(response) {

			var listOfBL = StringToJson(response);
			listOfBL[0].dvID = 'dvMyBLCustomerUpdate';

//			console.log(listOfBL);
			var liTemplate = Handlebars.compile($("#tplBLList").html());

			$('#ulRegisteredBLList').html(liTemplate({
				blList : listOfBL
			}));
			$('#ulRegisteredBLList').height($(window).height() - 50);
			setMyBLLabels();
		}
	});

}

function StringToJson(str) {
	var str1 = str.replace("\r", "");
	var str2 = str1.replace("\n", "");
	var jsonStr = str2.replace("\\\\", "");
	return JSON.parse(jsonStr);
}

function initBLRegistration() {
	$('#btnAddBL').click();
}

function setMyBLLabels() {
	$('.BLNO').text(bllabels.BLNO);
	$('.BLVessel').html(bllabels.VESSEL);
	$('.BLVesselNo').text(bllabels.VESSELNO);
	// $('.BLVesselDateType').text(bllabels.VESSELDATE);
	$('.BLStatus').text(bllabels.STATUS);
}

function initHomeScreen() {
	document.addEventListener("backbutton", backEvent, false);
	$('.screenSize').css('max-height', $(window).height());
	//$('#lblhomeScreenTitle').text(locale.HomeScreenTitle);
	setMenuLabels();

	var myBLDetails = {
		"UserName" : userName,
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'MyBlResult/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(myBLDetails),
		success : function(response) {

			var listOfBL = StringToJson(response);
			listOfBL[0].dvID = 'dvBLCustomerUpdate';

			// console.log("Sokhana Response",listOfBL);
			var liTemplate = Handlebars.compile($("#tplBLList").html());

			$('#ulHomeScreenRegisteredBLList').html(liTemplate({
				blList : listOfBL
			}));
			$('#ulHomeScreenRegisteredBLList').height($(window).height() - 50);
			setMyBLLabels();
		}
	});

	$("#notificationLink").click(function() {

		if (notificationStatus == 0) {
			$("#notificationContainer").hide();

		} else {
			$("#notification_count").fadeOut("slow");
			$("#notificationContainer").show();
		}
		return false;
	});

	$(document).click(function() {
		$("#notificationContainer").hide();
	});

	$("#notificationContainer").click(function() {
		return false;
	});

	
	  var notificationDetails = {"UserName": userName}; 
	  
	  $.ajax({ 
	  	url : api_url + 'NotificationList/', 
	  	type : 'POST', 
		  contentType : 'application/json;charset=utf-8', 
		  data : JSON.stringify(notificationDetails), 
	  	success : function(response) { 
	  		console.log("Got Response: " + response);
			  // if (response.ErrorMessage == "") { 
			  	var jsonResponse = StringToJson(response);
				 // alert(jsonResponse);
				  console.log("Notification json",jsonResponse);
				  var notificationTemplate = Handlebars.compile($("#tplnotificattion").html());
				  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
	  
				  var notificationTemplateList =
				  Handlebars.compile($("#tplnotificattionList").html());
				  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
				// }
	  	// 	else{
	  	// 		alert(response.ErrorMessage);
	  	// 	} 
	  	} 
	  });
	  
	  setInterval(function() { 
		  $.ajax({ 
		  	url : api_url + 'NotificationList/', 
			  type :'POST', 
			  contentType : 'application/json; charset=utf-8', 
			  data :JSON.stringify(notificationDetails), 
			  success : function(response) { 
			  	 if(response.ErrorMessage == "") { 
			  		var jsonResponse =
					  StringToJson(response); 
					  console.log("Notification json",jsonResponse);
					  
					  var notificationTemplate =
					  Handlebars.compile($("#tplnotificattion").html());
					  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
					  
					  var notificationTemplateList =
					  Handlebars.compile($("#tplnotificattionList").html());
					  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
					}
			   	else {
			   		//alert(response.ErrorMessage);
			   	} 
			  } 
			}); 
		}, 15000);
	 

}

function setMenuLabels() {
	$('#lblMenuBLInfo').text(locale.MenuBLInfo);
	$('#lblBLInfoReg').text(locale.MenuBLReg);
	$('#lblBLInfoBLStatus').text(locale.MenuBLStatus);
	$('#lblBLInfoProformaInvoice').text(locale.MenuProformaInvoice);
	$('#lblBLInfoMyBLs').text(locale.MenuMyBL);
	$('#lblBLInfoPaymentPendingList').text(locale.MenuPaymentPendingList);

	$('#lblMenuContainerInfo').text(locale.MenuContainerInfo);
	$('#lblMenuVesselInfo').text(locale.MenuVesselInfo);
	$('#lblMenuLegalDetails').text(locale.MenuLegalDetails);
	$('#lblMenuSettings').text(locale.MenuSettings);
	$('#lblMenuAdmin').text(locale.MenuAdmin);
	$('#lblMenuContactUs').text(locale.MenuContactUs);
	$('#lblMenuHelp').text(locale.MenuHelp);
	$('#lblMenuLogout').text(locale.MenuLogout);

	$('#lblhomeScreenTitle').text(locale.HomeScreenTitle);
	$('#ifmHelp').attr('src', locale.HelpInfo);
}

function ShowPaymentPendingList() {

	var myBLDetails = {
		"UserName" : userName,
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'PaymentResultSet/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(myBLDetails),
		success : function(response) {

			var jsonResponse = StringToJson(response);

			console.log(JSON.stringify(jsonResponse));

			var PaymentHeader = '';
			var width = Math.floor(100 / (jsonResponse.Columns.length)) - 1;
			for (var i = 0; i < jsonResponse.Columns.length; i++) {
				PaymentHeader += '<li style="width:' + width + '%">'
						+ jsonResponse.Columns[i] + '</li>';
			}
			PaymentHeader += '<div class="clear"></div>';

			$('#paymentDetailsHeader').html(PaymentHeader);

			var liTemplate = Handlebars.compile($("#tplPaymentPendingList")
					.html());

					
				
					

			// convert all amounts to EGP format.
			var total = 0;
			for ( var i in jsonResponse.data) {
				var listTotal = 0;
				for ( var j in jsonResponse.data[i].list) {
					listTotal += jsonResponse.data[i].list[j].column3;
					jsonResponse.data[i].list[j].column3 = formatAmount(jsonResponse.data[i].list[j].column3);
				}
				total += listTotal;
				jsonResponse.data[i].ListTotal = formatAmount(listTotal);
			}

			// update grand total
			$('#lblTotalPaymentPending').text(formatAmount(total));

			// $('#paymentPendingList').html(liTemplate(paymentPendingList.data));
			$('#paymentPendingList').html(liTemplate({
				pList : jsonResponse.data
			}));
			$('.PaymentColumn').css('width', width + '%');
			$('.detailsList').css(
					'max-height',
					($(window).height() - ($('.pageHeader').height()
							+ $('#lblPaymentPendingListTitle').height()
							+ $('.paymentTotal').height()
							+ $('.paymentDetails').height() + 20)));

		}
	});
}

$(document).ready(
		function() {
			$(document).on('click', '.chklist-delete', function() {
				if ($(this).is(':checked')) {
					BLNoArr.push($(this).val());
				} else {
					var removeItem = $(this).val();
					BLNoArr.splice($.inArray(removeItem, BLNoArr), 1);
				}
			});

			if (platform === "ios") {
				$(document).on(
						'taphold',
						'.li-BLList',
						function(e) {
							$(document).unbind('taphold');
							$('#BLDustbinHome').show();
							$('#BLDustbin').show();
							$("#ulHomeScreenRegisteredBLList").find(
									'.chklist-delete').show();
							$("#ulHomeScreenRegisteredBLList").find(
									'.imgBLForword').hide();
							$("#ulRegisteredBLList").find('.chklist-delete')
									.show();
							$("#ulRegisteredBLList").find('.imgBLForword')
									.hide();
							return false;
						});

			} else {
				$(document).on(
						'taphold',
						'.li-BLList',
						function(e) {

							$('#BLDustbinHome').show();
							$('#BLDustbin').show();
							$("#ulHomeScreenRegisteredBLList").find(
									'.chklist-delete').show();
							$("#ulHomeScreenRegisteredBLList").find(
									'.imgBLForword').hide();
							$("#ulRegisteredBLList").find('.chklist-delete')
									.show();
							$("#ulRegisteredBLList").find('.imgBLForword')
									.hide();
							return false;
						});

			}

			if (Language == 1) {
				$.getScript("js/locales/lang-en.js", function() {
					setLanguage();
				});
			} else if (Language == 2) {
				$.getScript("js/locales/lang-ar.js", function() {
					setLanguage();
				});
			} else if (Language == 3) {
				$.getScript("js/locales/lang-fr.js", function() {
					setLanguage();
				});
			}
			$('#txtLoginPassword').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					Login();
				}
				return true;
			});

			$('#txtBLRegBLNo').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#txtBLRegCutomerName').focus().select();
				}
				return true;
			});

			$('#txtBLRegCutomerName').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnBLRegisterDialogOk').focus();
				}
				return true;
			});

			$('#btnBLRegisterDialogOk').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnBLRegisterDialogAdd').focus();
				}
				return true;
			});

			$('#txtBLRegBLNoHome').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#txtBLRegCutomerNameHome').focus().select();
				}
				return true;
			});

			$('#txtBLRegCutomerNameHome').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnBLRegisterDialogOkHome').focus();
				}
				return true;
			});

			$('#btnBLRegisterDialogOkHome').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnBLRegisterDialogAddHome').focus();
				}
				return true;
			});

			$('#txtBLChangeCustomer').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnChangeCustomerCancel').focus();
				}
				return true;
			});

			$('#btnChangeCustomerCancel').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnChangeCustomerOk').focus();
				}
				return true;
			});

			$('#txtChangePasswordOldPassword').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#txtChangePasswordNewPassword').focus().select();
				}
				return true;
			});

			$('#txtChangePasswordNewPassword').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnChangePasswordOk').focus();
				}
				return true;
			});

			$('#btnChangePasswordOk').on('keyup', function(e) {
				var theEvent = e || window.event;
				var keyPressed = theEvent.keyCode || theEvent.which;
				if (keyPressed == 13) {
					$('#btnChangePasswordCancel').focus();
				}
				return true;
			});

			$('#dvUlList').css('max-height',
					($(window).height() - $('#dvUserProfile').height()) - 20);
			$('.leftPanelListView').css('height',
					($(window).height() - $('#dvUserProfile').height()) - 120);
			$('#dvTermsConditionsContent').height($(window).height() - 225);
			$('#signUpBodyContent').height($(window).height() - 120);
			$('#dvNotificationsContent').height($(window).height() - 130);
			$('#dvContainerInfoPage').height($(window).height() - 20);
			// document.addEventListener("pause", doLogout, false);
			// document.addEventListener("backbutton", backEvent, false);
			if (tempStatus == "Y") {
				$('#btnLoginLogin').attr('href', changePasswordLink);
				$("#txtChangePasswordUserName").val(userName);
			}
			
			

			
			
		});

$(document).on('pageinit', '#dvHomePage',function(e,data){
	if (Language === "1") {
		$.getScript("js/locales/lang-en.js", function() {
			setLanguage();
		});
	} else if (Language === "2") {
		$.getScript("js/locales/lang-ar.js", function() {
			setLanguage();
		});
	} else if (Language === "3") {
		$.getScript("js/locales/lang-fr.js", function() {
			setLanguage();
		});
	}
});


function backEvent() {
	navigator.notification.confirm('Are you sure you want to Log Off?',
			onConfirm, 'Log Off', [ 'Cancel', 'Logoff' ]);
}

function onConfirm(buttonIndex) {
	if (buttonIndex == 2) {
		navigator.app.exitApp();
	}
}

function Login() {
	if (!debug) {
		if (platform === "Android") {
			//SoftKeyboard.hide(function(isShowing) {
				doLogin();
			//}, function() {
			//	console.log('error');
			//});
		} else if (platform === "iOS") {
			doLogin();
		}
	} else {
		doLogin();
	}
}

Handlebars.registerHelper('paymentSubTotal', function(list) {
	var total = 0;
	for ( var i in list) {
		total += list[i].column3;
	}
	return total;
});

Handlebars
		.registerHelper(
				'if',
				function(conditional, options) {
					console.log(conditional);
					if (conditional == "GEN") {
						// $("#btn-tab-ContHaz").hide();
						var bottomTabs = '<li><a href="#" id="btn-tab-ContBasic" class="tab-contBasic ui-btn-active" onclick="switchContainerTabs(0);"></a></li><li><a href="#" id="btn-tab-ContHistory" class="tab-contHistory" onclick="switchContainerTabs(1);"></a></li><li><a href="#" id="btn-tab-ContDocs" class="tab-contOdc" onclick="switchContainerTabs(2);"></a></li><li><a href="#" id="btn-tab-ContDamage" class="tab-contDamage" onclick="switchContainerTabs(4);"></a></li>';
						$("#ulContInfoFooterTabs").append(bottomTabs);
					} else {
						console.log("tag Label", conditional);
						var bottomTabs = '<li><a href="#" id="btn-tab-ContBasic" class="tab-contBasic ui-btn-active" onclick="switchContainerTabs(0);"></a></li><li><a href="#" id="btn-tab-ContHistory" class="tab-contHistory" onclick="switchContainerTabs(1);"></a></li><li><a href="#" id="btn-tab-ContDocs" class="tab-contOdc" onclick="switchContainerTabs(2);"></a></li><li><a href="#"  class="tab-contHaz" onclick="switchContainerTabs(3);">'
								+ conditional
								+ '</a></li><li><a href="#" id="btn-tab-ContDamage" class="tab-contDamage" onclick="switchContainerTabs(4);"></a></li>';
						// $("#btn-tab-ContHaz").text(conditional);
						$("#ulContInfoFooterTabs").append(bottomTabs);

					}
				});

function formatAmount(amt){
		var strAmt = amt.toString().replace(
                /\B(?=(\d{3})+(?!\d))/g, ",") + " CFA";
    return strAmt;
}

function paymentGrandTotal(data) {
	var total = 0;
	for ( var i in data) {
		for ( var j in data[i].list) {
			total += data[i].list[j].column3;
		}
	}


	return formatAmount(total);
}


function forgotPassword() {
	userName = $('#txtLoginUserName').val();

	if (userName.trim() == "") {
		navigator.notification.alert(errMessage.loginUserNameEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	var passwordDetails = {
		UserName : userName,
	};

	$.ajax({
		url : api_url + 'ForgetPassword/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(passwordDetails),
		success : function(response) {
			if (response.ErrorMessage == "") {
				navigator.notification.alert(
						successMessage.forgotPasswordChange, null,
						successMessage.Title, locale.AlertOK);
			} else {
				navigator.notification.alert(
						errMessage.forgotPasswordInvalidUser, null,
						errMessage.Title, locale.AlertOK);
			}
		}
	});
}

function doLogout() {
	//if (LoginStatus) {
		if (platform === "iOS") {
			$('#txtLoginUserName').val('');
			$('#txtLoginPassword').val('');
			window.location = "#dvLogin";
		} else {
			if(navigator.app){
					navigator.app.exitApp();
			}else if(navigator.device){
					navigator.device.exitApp();
			}
		}
	//}
}

function setExtrlable(){
	$('#lblBLRegisterDialogTitle').text(locale.RegisterBLTitle);
	$('#lblBLRegisterDialogTitleHome').text(locale.RegisterBLTitle);
	$('#lblBLRegisterDialogMyBLTitle').text(locale.RegisterBLTitle);
	$('#lblBLRegisterDialogNote').text(locale.RegisterBLNote);
	$('#lblBLRegisterDialogNoteHome').text(locale.RegisterBLNote);
	$('#lblBLRegisterDialogMyBLNote').text(locale.RegisterBLNote);
	$('#lblBLRegisterDialogBLNumber').text(locale.RegisterBLNumber);
	$('#lblBLRegisterDialogBLNumberHome').text(locale.RegisterBLNumber);
	$('#lblBLRegisterDialogMyBLNumber').text(locale.RegisterBLNumber);
	$('#lblBLRegisterDialogCustomerName').text(locale.RegisterCustomerName);
	$('#lblBLRegisterDialogCustomerNameHome').text(locale.RegisterCustomerName);
	$('#lblBLRegisterDialogMyBLCustomerName').text(locale.RegisterCustomerName);
	$('#lblBLRegisterDialogNotification').text(
			locale.RegisterCustomerNotification);
	$('#btnBLRegisterDialogOk').text(locale.RegisterBLOkbtn);
	$('#btnBLRegisterDialogAdd').text(locale.RegisterBLAddbtn);
	$('#btnBLRegisterDialogOkHome').text(locale.RegisterBLOkbtn);
	$('#btnBLRegisterDialogOkMyBL').text(locale.RegisterBLOkbtn);
	$('#btnBLRegisterDialogAddHome').text(locale.RegisterBLAddbtn);
	$('#btnBLRegisterDialogAddMyBL').text(locale.RegisterBLAddbtn);
	$('#lblContactDetailsContactPerson').text(
			locale.ContactDetailsContactPerson + ":");
	$('#lblContactDetailsMailId').text(locale.ContactDetailsMailId + ":");
	$('#lblContactDetailsContactNo').text(locale.ContactDetailsContactNo + ":");
	$('#lblContactDetailsContactAddress').text(
			locale.ContactDetailsContactAddress + ":");
	$('#lblContactDetailsWebsite').text(locale.ContactDetailsWebsite + ":");

	$('#lblPaymentPendingListTitle').text(locale.PaymentPendingList);
	$('#lblPaymentPendingListTotal').text(locale.PaymentPendingListTotal);
	$('#lblPaymentPendingListBLNO').text(locale.PaymentPendingListBLNO);
	$('#lblPaymentPendingListVessel').text(locale.PaymentPendingListVessel);
	$('#lblPaymentPendingListAmount').text(locale.PaymentPendingListAmount);

	$('#lblNotificationsTitle').text(locale.NotificationsTitle);
	$('#lblNotificationsContinue').text(locale.NotificationsContinue);
	$('#dvNotificationsScrollDiv').html(locale.Notifications);
	$('#lblDontShowThisPage').text(locale.NotificationsDontShow);

	$('#btntabStatus').text(locale.lblBLStatus);
	$('#btntabHistory').text(locale.lblBLHistory);
	$('#btntabInvoice').text(locale.lblBLInvoice);

	$('#lblFilterByCustomerName').text(locale.FilterByCustomerName);
	$('#lblFilterByStatus').text(locale.FilterByStatus);
	$('#lblFilterByVessel').text(locale.FilterByVessel);
	$('#lblFilterByBL').text(locale.FilterByBLNo);
	$('#lblFilterByDateFrom').text(locale.FilterByFromDate);
	$('#lblFilterByDateTo').text(locale.FilterByToDate);

	$('#lblSettingTitle').text(locale.SettingTitle);
	$('#lblSettingUserName').text(locale.UserName);
	$('#lblSettingOldPassword').text(locale.OldPassword);
	$('#lblSettingNewPassword').text(locale.NewPassword);
	$('#lblSettingConfirmPassword').text(locale.ConfirmPassword);
	$('#lblSettingEmailId').text(locale.EmailId);
	$('#lblSettingPhoneNumber').text(locale.PhoneNumber);
	$('#lblSettingLanguage').text(locale.Language);
	$('#lblSettingUserType').text(locale.UserType);
	$('#lblSettingCompanyName').text(locale.ComapnyName);
	$('#lblSettingTerminal').text(locale.Terminal);
	$('#lblSettingSave').text(locale.SettingSave);
	$('#lblAdminSave').text(locale.SettingSave);
	$('#lblLegalDetailTitle').text(locale.LegalDetailTitle);
	$('#lblHelpTitle').text(locale.HelpTitle);
	$('#lblvesselInfoTitle').text(locale.lblvesselInfoTitle);
	$('#lblnotificationTitle').text(locale.lblnotificationTitle);
	$('#btnnotificationClearAll').text(locale.btnnotificationClearAll);
	$('#lblNotificationFooter').text(locale.lblNotificationFooter);
	$('#lblContactUs').text(locale.MenuContactUs);
	$('#lblBLChangeCustomerTitle').text(locale.ChangeCustomerTitle);
	$('#lblMyBLChangeCustomerTitle').text(locale.ChangeCustomerTitle);
	$('#lblChangePasswordTitle').text(locale.ChangePasswordTitle);
	$('#lblChangePasswordNote').text(locale.ChangePasswordNote);
	$('#lblBLChangeCustomerNote').text(locale.ChangeCustomerNote);
	$('#lblMyBLChangeCustomerNote').text(locale.ChangeCustomerNote);
	$('#lblMyBLCustomerName').text(locale.CustomerName);
	$('#btnMyBLChangeCustomerCancel').text(locale.ChangeCustomerCancel);
	$('#btnMyBLChangeCustomerOk').text(locale.ChangeCustomerOk);
	$('#lblBLCustomerName').text(locale.CustomerName);
	$('#btnChangeCustomerCancel').text(locale.ChangeCustomerCancel);
	$('#btnChangeCustomerOk').text(locale.ChangeCustomerOk);
	$('#lblMyBLTitle').text(locale.MyBLTitle);
}

function setLanguage() {
	setExtrlable();
	setMenuLabels();
	setScreenLabels();
	
	$('#btn-tab-blStatus').text(locale.lblBLStatus)
	$('#btn-tab-blHistory').text(locale.lblBLHistory)
	$('#btn-tab-blInvoice').text(locale.lblBLInvoice)
	$('#btnLoginLogin').text(locale.lblLogin);
	$('#btnLoginSignUp').text(locale.lblSignUp);

	$('#lblLegalDetails').text(locale.lblLegalDetails);
	$('#lblMyBlSettings').text(locale.lblMyBlSettings);
	$('#lblSaveMyBlSettings').text(locale.lblSaveMyBlSettings);
	$('#lblMyBLSettingsGroupBy').text(locale.lblMyBLSettingsGroupBy);

	$('#lblMyBLSettingsFilterBy').text(locale.lblMyBLSettingsFilterBy);

	$('#lblFilterDateFrom').text(locale.lblFilterDateFrom);
	$('#lblFilterDateTo').text(locale.lblFilterDateTo);

	$('#lblBLRegistration').text(locale.lblBlRegistration);
	$('#lblProformaBLNumber').text(locale.lblProformaBLNumber);
	$('#lblInvoiceTitle').text(locale.lblInvoiceTitle);
	$('#lblContainerInfoTitle').text(locale.lblContainerInfoTitle);

	$('#btn-tab-ContBasic').text(locale.lblContBasic);
	$('#btn-tab-ContHistory').text(locale.lblContHistory);
	$('#btn-tab-ContDocs').text(locale.lblContDocs);
	$('#btn-tab-ContHaz').text(locale.lblContHaz);
	$('#btn-tab-ContDamage').text(locale.lblContDamage);

	$('#lblLoginAppVersion').text(locale.AppVersion + version);
	$('#lblSignUpUserRegistration').text(locale.SignUpTitle);
	$('#lblSignUpNext').text(locale.Next);
	$('#lblSignUpUserName').text(locale.UserName);
	$('#lblSignUpPassword').text(locale.Password);
	$('#lblSignUpConfirmPassword').text(locale.ConfirmPassword);
	$('#lblSignUpEmailId').text(locale.EmailId);
	$('#lblSignUpPhoneNumber').text(locale.PhoneNumber);
	$('#lblSignUpLanguage').text(locale.Language);
	$('#lblSignUpUserType').text(locale.UserType);
	$('#lblSignUpTerminal').text(locale.Terminal);
	$('#lblTermsConditionsRegistration').text(locale.Registration);
	$('#lblSignUpCompanyName').text(locale.ComapnyName);
	$('#lblSignUpNote').text(locale.SignUpNote);
	$('#lblTermsAndConditions').text(locale.TermsAndConditionsHeader);
	$('#btnTermsConditionsAgreed').text(locale.IAgree);
	$('#btnTermsConditionsDoNotAgreed').text(locale.IDoNotAgree);
	$('#dvTermsConditionsScrollDiv').html(locale.TermsAndConditions);
	$('#dvLegalDetailsTermsConditionsScrollDiv')
			.html(locale.TermsAndConditions);
	$('#dvHelpTermsConditionsScrollDiv').html(locale.HelpInfo);
	$('#lblTermsConditionsBottomNote').html(locale.TermsConditionsNote);
	$('#lblAcceptTermsAnsConditions').html(locale.AcceptTAC);
	$('#lblLoginCreateAccount').text(locale.DontHaveAccountYet);
	$('#lblUserRegstration').text(locale.lblUserRegstration);

	
	// added here 
	

	// Till here
	 
	
	
	$('#lblSignUpBack').text(locale.SignUPBack);
	$('#lblSignUpNext').text(locale.SignUPNext);
	$('#lblCoverLoading').text(locale.CoverLoading);

	$('#lblUserAuthentication').text(locale.UserAuthetication);
	$('#lblUserAuthenticationCode').text(locale.UserAutheticationCode);
	$('#dvAuthenticationAlert').html(locale.UserAutheticationAlert);
	$('#btnUserAuthenticationOK').text(locale.UserAutheticationOk);
	$('#btnUserAuthenticationCancel').text(locale.UserAutheticationCancel);
	$('#btnLoginForgot').text(locale.ForgotPassword);
	$('#lblChangePasswordUserName').text(locale.ChangePasswordUserName);
	$('#lblChangePasswordOldPassword').text(locale.ChangePasswordOldPassword);
	$('#lblChangePasswordNewPassword').text(locale.ChangePasswordNewPassword);
	$('#btnChangePasswordOk').text(locale.ChangePasswordOk);
	$('#btnChangePasswordCancel').text(locale.ChangePasswordCancel);
	$.each(locale.locations[(LocationId)], function(key, value) {
		// $('#lblUserLocation').text(value);// sets location name
	});
	// $('#lblUserLocation').text(locale.locations[LocationId]); // sets
	// location name
	$('#imgFlag').prop('src', 'img/' + (LocationId) + 'flag.png'); // sets
	// location
	// flag

	
	var optionsTemplate = Handlebars.compile($("#tplOptionsList").html());

	$('#lstSignUPUserType').html(optionsTemplate(locale.UserTypes));

	$('#lstSignUPTerminal').html(optionsTemplate(locale.locations));

	$('#lstSignUPLanguage').html(optionsTemplate(locale.languagesList));

	/*for ( var i in locale.ProformaOptions) {
		$('#lstProformOptions').append(
				'<option value="' + (parseInt(i) + 1) + '">'
						+ locale.ProformaOptions[i] + '</option>');
	}
*/ //comment by Manohar for Dakar
	for ( var i in locale.ContactUsLabels) {

		$('#listData').append(
				'<li><p>' + locale.ContactUsLabels[i] + '</p></li>');
	}
	$('#lstMyBlGroupOptions').html('');
	for (var i = 0; i < groupByOptions.length; i++) {
		$('#lstMyBlGroupOptions').append(
				'<option value=' + groupByOptions[i].optionValue + '>'
						+ groupByOptions[i].optionText + '</option>');
	}
}

function getLocation() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError)
}

function onSuccess(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
}

function onError(error) {
	navigator.notification.alert(error.message, null, successMessage.Title,
			locale.AlertOK);
}

function doLogin() {
	if (!debug)
		getLocation();
	
	userName = $('#txtLoginUserName').val();
	userPass = $('#txtLoginPassword').val();

	if (userName.trim() == "") {
		navigator.notification.alert(errMessage.loginUserNameEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	} else if (userPass.trim() == "") {
		navigator.notification.alert(errMessage.loginPasswordEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}
	if (!debug) {
		var networkState = navigator.connection.type;
		if (networkState == Connection.NONE) {
			navigator.notification.alert(errMessage.noInternetConnection, null,
					errMessage.Title, locale.AlertOK);
			return;
		}
	}

	var LoginCredentails;
	if (!debug) {
		if (platform === "Android") {
			LoginCredentails = {
				UserName : userName,
				Password : userPass,
				Latitude : 19.110734,
				Longitude : 73.017376,
				MachId : device.uuid,
				AppVersion : ""
			};
		} else if (platform === "iOS") {
			LoginCredentails = {
				UserName : userName,
				Password : userPass,
				Latitude : latitude,
				Longitude : longitude,
				MachId : device.uuid,
			};
		}
	} else {
		LoginCredentails = {
			UserName : userName,
			Password : userPass,
			latitude : 19.110734,
			longitude : 73.017376,
			MachId : "",
			AppVersion : version
		};
	}
		//alert(LoginCredentails);
	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});

	
	$.ajax({
		url : api_url + 'LoginValidity/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(LoginCredentails),
		success : function(response) {
			$.mobile.loading("hide");
			if (response.ErrorMessage == "") {

				LoginStatus = true;

				setGlobalVariables(response);
				//Language = 3;
			

				if (response.UserStatus == "A") {
					showUserAuthentication();
				} else if (tempStatus == "Y" && response.ErrorMessage == "") {
					UserNotificationStatus = response.NotificationStatus;

					$('#btnLoginLogin').attr('href', changePasswordLink);
					$("#txtChangePasswordUserName").val(userName);
				} else if (response.NotificationStatus == "Y"
						|| response.NotificationStatus == "") {
					showNotifications();
				} else if (response.UserStatus == "Y") {
					LoginSuccess();
				} else {
					navigator.notification.alert(errMessage.userStatus, null,
							errMessage.Title, locale.AlertOK);
					$('#btnLoginLogin').attr('href', "");
					return;
				}
			} else {
				navigator.notification.alert(
						errMessage.userNamePasswordMismatch, null,
						errMessage.Title, locale.AlertOK);
				$('#btnLoginLogin').attr('href', "");
			}
		},
		timeout: 30000,
		error: function(x, t, m) {
			$.mobile.loading("hide");
		        
			navigator.notification.alert("Unable to process the request. Please try later!", null,
					errMessage.Title, locale.AlertOK);
		        
		}
	});
}

function showRegterms() {
	// window.location="#dvTermsConditions";

	if ($('#txtSignUpUserName').val().trim() == "") {
		navigator.notification.alert(errMessage.signUpUserNameEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (hasWhiteSpace($('#txtSignUpUserName').val())) {
		navigator.notification.alert(errMessage.signUpUserNameSpace, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (!isString($('#txtSignUpUserName').val())) {
		navigator.notification.alert(errMessage.signUpUserNameSpecialCharacter,
				null, errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpPassword').val().trim() == "") {
		navigator.notification.alert(errMessage.signUpPasswordEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpPassword').val().length < 8) {
		navigator.notification.alert(errMessage.signUpPasswordMinCharacters,
				null, errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpConfirmPassword').val().trim() == "") {
		navigator.notification.alert(errMessage.signUpConfirmPasswordEmpty,
				null, errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpPassword').val() != $('#txtSignUpConfirmPassword').val()) {
		navigator.notification.alert(errMessage.signUpPasswordNotMatch, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpEmailId').val().trim() == "") {
		navigator.notification.alert(errMessage.signUpEmailIdEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (!validateEmail($('#txtSignUpEmailId').val())) {
		navigator.notification.alert(errMessage.signUpEmailIdInValid, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpCountryCode').val() == "") {
		navigator.notification.alert(errMessage.signUpCountryCodeEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (isNaN($('#txtSignUpCountryCode').val())) {
		navigator.notification.alert(errMessage.signUpCountryCodeInvalid, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if ($('#txtSignUpPhoneNumber').val() == "") {
		navigator.notification.alert(errMessage.signUpPhoneNumberEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (isNaN($('#txtSignUpPhoneNumber').val())) {
		navigator.notification.alert(errMessage.signUpPhoneNumberNotValid,
				null, errMessage.Title, locale.AlertOK);
		return;
	}

	window.location = "#dvTermsConditions";
}

function hasWhiteSpace(str) {
	return /\s/g.test(str);
}

function isString(str) {
	var regex = new RegExp("^[a-zA-Z.]*$");
	return regex.test(str);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function ToggledvSignUpCompanyName() {// HARDCODED COMPANY NAMES
	var i = $('#lstSignUPUserType').val();
	if (i == 1 || i == 6 || i == 7) {
		$('#dvSignUpCompanyName').fadeIn();
	} else {
		$('#dvSignUpCompanyName').fadeOut();
	}
}

function toggleAgreeButton() {
	if ($('#cbxTermsConditionsTermsAndCondotions').is(":checked")) {
		$('#btnTermsConditionsAgreed').prop("disabled", false);
	} else {
		$('#btnTermsConditionsAgreed').prop("disabled", true);
	}
}

function showUserAuthentication() {
	window.location = "#dvUserAuthentication";
}

function doAgree() {
	if (platform === "iOS") {
		deviceRegistrationId = "";
	}

	var SignupData = {
		UserName : $('#txtSignUpUserName').val(),
		Password : $('#txtSignUpPassword').val(),
		FullName : $('#txtSignUpUserName').val(),
		MailId : $('#txtSignUpEmailId').val(),
		MobileNo : $('#txtSignUpCountryCode').val() + "-"
				+ $('#txtSignUpPhoneNumber').val(),
		Language : $('#lstSignUPLanguage').val(),
		CustomerType : $('#lstSignUPUserType').val(),
		CustomerRefCode : $('#txtSignUpCompanyName').val(),
		LocationId : $('#lstSignUPTerminal').val(),
		AppVersion : version,
		MachId : device.uuid,
		DeviceRegId : deviceRegistrationId
	};
	$.ajax({
		url : api_url + 'UserMaster/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(SignupData),
		success : function(response) {
			if (response.ErrorMessage == "") {
				// navigator.notification.alert(successMessage.signUpMessage,
				// null, successMessage.Title, locale.AlertOK);
				window.location = "#dvLogin";
				return;
			} else {
				//window.Toast.show(response.ErrorMessage);
				navigator.notification.alert(response.ErrorMessage, null,
						"ERROR", locale.AlertOK);
				
				return;
			}
		}
	});
}

function doNotAgree() {
	window.location = "#dvLogin";
}

function AuthenticateUser() {

	if ($('#txtUserAuthentication').val() == AuthenticationKey) {
		LoginSuccess();
		var AuthenticationData = {
			"UserName" : userName,
			"UserStatus" : "Y"
		};

		$.ajax({
			url : api_url + 'UserAuthenticate/',
			type : 'POST',
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(AuthenticationData),
			success : function(response) {
				if (response.ErrorMessage == "") {
					navigator.notification.alert(
							successMessage.UserAuthenticate, null,
							successMessage.Title, locale.AlertOK);
					showNotifications();
				} else {
					navigator.notification.alert(response.ErrorMessage, null,
							successMessage.Title, locale.AlertOK);
				}
			}
		});
	} else {
		navigator.notification.alert(errMessage.authenticationFailed, null,
				errMessage.Title, locale.AlertOK);
	}
}

function proceedToLogin() {
	if ($('#cbxNotifications').is(":checked")) {
		updateNotificationStatus();
	}
	LoginSuccess();
}

function updateNotificationStatus() {

	var notificationDetails = {
		"UserName" : userName
	};

	$.ajax({
		url : api_url + 'UserNotification/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(notificationDetails),
		success : function(response) {

			if (response.ErrorMessage == "") {

			} else {
				navigator.notification.alert(response.ErrorMessage, null,
						errMessage.Title, locale.AlertOK);
			}
		}
	});
}

function showNotifications() {
	window.location = "#dvNotifications";
}

function showCalender() {
	$('#txtPickUpDate').click();
}

function setGlobalVariables(response) {
	LocationId = response.LocationId;
	Language = response.Language;
	PasswordChangeDate = response.PasswordChangeDate;
	UserStatus = response.UserStatus;
	JobId = response.JobId;
	CustomerId = response.CustomerId;
	CustomerRefCode = response.CustomerRefCode;
	CustomerType = response.CustomerType;
	MenuId = response.MenuId;
	SessionId = response.SessionId;
	FullName = response.FullName;
	AuthenticationKey = response.AuthenticateKey;
	settingMobileNo = response.MobileNo;
	settingEmailId = response.MailId;
	tempStatus = response.TempStatus;

}

function LoginSuccess() {
	window.location = "#dvHomePage";
	$('#lblHomeScreenUsername').text(FullName);
}

function RegisterBL(blflag) {
	var blNo = $('#txtBLRegBLNo').val();
	var blCustomerName = $('#txtBLRegCutomerName').val();

	if (blNo.trim() == "") {
		navigator.notification.alert(errMessage.blNoEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegBLNo').focus();
		return;
	}

	if (blCustomerName.trim() == "") {
		navigator.notification.alert(errMessage.blCustomerNameEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegCutomerName').focus();
		return;
	}
	var BLDetails = {
		"GroupId" : BLGroupId,
		"UserName" : userName,
		"BlNumber" : blNo,
		"CustomerName" : blCustomerName,
		"LocationId" : LocationId
	};

	// $('#btnBLRegisterDialogOk').prop('disabled',true);
	// $('#btnBLRegisterDialogAdd').prop('disabled',true);

	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});
	
	$.ajax({
		url : api_url + 'BLInsert/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLDetails),
		success : function(response) {
			$.mobile.loading("hide");
			if (response.ErrorMessage == "") {
				BLGroupId = response.GroupId;
				response.BlNumber = response.BlNumber.toUpperCase();
				var registerBLTemplate = Handlebars.compile($(
						"#tplRegisterBLList").html());
				$('#ulRegisterBLList').append(registerBLTemplate(response));
				setRegBLLabels();
				if (blflag == "new") {
					closeBLpopup();
				} else {
					// $('#btnBLRegisterDialogOk').prop('disabled',false);
					// $('#btnBLRegisterDialogAdd').prop('disabled',false);
					$('#txtBLRegBLNo').val('');
					// $('#txtBLRegCutomerName').val('');
					$('#txtBLRegBLNo').focus();
				}
			} else {
				$.mobile.loading("hide");
				navigator.notification.alert(response.ErrorMessage, null,
						"ERROR", locale.AlertOK);
				//window.Toast.show(response.ErrorMessage);
			}
		}
	});
}

function RegisterBLHome(blflag) {
	var blNo = $('#txtBLRegBLNoHome').val();
	var blCustomerName = $('#txtBLRegCutomerNameHome').val();

	if (blNo.trim() == "") {
		navigator.notification.alert(errMessage.blNoEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegBLNoHome').focus();
		return;
	}

	if (blCustomerName.trim() == "") {
		navigator.notification.alert(errMessage.blCustomerNameEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegCutomerNameHome').focus();
		return;
	}
	var BLDetails = {
		"GroupId" : BLGroupId,
		"UserName" : userName,
		"BlNumber" : blNo,
		"CustomerName" : blCustomerName,
		"LocationId" : LocationId
	};

	// $('#btnBLRegisterDialogOk').prop('disabled',true);
	// $('#btnBLRegisterDialogAdd').prop('disabled',true);

	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});

	
	$.ajax({
		url : api_url + 'BLInsert/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLDetails),
		success : function(response) {
			$.mobile.loading("hide");
			if (response.ErrorMessage == "") {
				console.log("Got Response: " + JSON.stringify(response));
				BLGroupId = response.GroupId;
				response.BlNumber = response.BlNumber.toUpperCase();
				var registerBLTemplate = Handlebars.compile($(
						"#tplRegisterBLList").html());
				$('#ulHomeScreenRegisteredBLList').append(
						registerBLTemplate(response));
				setRegBLLabels();
				if (blflag == "new") {
					closeBLpopup();
				} else {
					// $('#btnBLRegisterDialogOk').prop('disabled',false);
					// $('#btnBLRegisterDialogAdd').prop('disabled',false);
					$('#txtBLRegBLNoHome').val('');
					// $('#txtBLRegCutomerName').val('');
					$('#txtBLRegBLNoHome').focus();
				}
			} else {
				$.mobile.loading("hide");
				navigator.notification.alert(response.ErrorMessage, null,
						"ERROR", locale.AlertOK);
//				window.Toast.show(response.ErrorMessage);
			}
		}
	});
}

function RegisterBLMyBL(blflag) {

	var blNo = $('#txtBLRegBLNoMyBL').val();
	var blCustomerName = $('#txtBLRegCutomerNameMyBL').val();
	if (blNo.trim() == "") {
		navigator.notification.alert(errMessage.blNoEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegBLNoMyBL').focus();
		return;
	}

	if (blCustomerName.trim() == "") {
		navigator.notification.alert(errMessage.blCustomerNameEmpty, null,
				"ERROR", locale.AlertOK);
		$('#txtBLRegCutomerNameMyBL').focus();
		return;
	}
	var BLDetails = {
		"GroupId" : BLGroupId,
		"UserName" : userName,
		"BlNumber" : blNo,
		"CustomerName" : blCustomerName,
		"LocationId" : LocationId
	};

	// $('#btnBLRegisterDialogOk').prop('disabled',true);
	// $('#btnBLRegisterDialogAdd').prop('disabled',true);
	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});

	
	$.ajax({
		url : api_url + 'BLInsert/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLDetails),
		success : function(response) {
			$.mobile.loading("hide");
			if (response.ErrorMessage == "") {
				BLGroupId = response.GroupId;
				var registerBLTemplate = Handlebars.compile($(
						"#tplRegisterBLList").html());
				$('#ulRegisteredBLList').append(registerBLTemplate(response.toUpperCase));
				setRegBLLabels();
				if (blflag == "new") {
					closeBLpopup();
				} else {
					// $('#btnBLRegisterDialogOk').prop('disabled',false);
					// $('#btnBLRegisterDialogAdd').prop('disabled',false);
					$('#txtBLRegBLNoMyBL').val('');
					// $('#txtBLRegCutomerName').val('');
					$('#txtBLRegBLNoMyBL').focus();
				}
			} else {
				$.mobile.loading("hide");
				navigator.notification.alert(response.ErrorMessage, null,
						"ERROR", locale.AlertOK);
//				window.Toast.show(response.ErrorMessage);
			}
		}
	});
}

function setRegBLLabels() {
	$('.BLNO').text(bllabels.BLNO);
	$('.BLVessel').html(bllabels.VESSEL);
	$('.BLVesselNo').text(bllabels.VESSELNO);
	// $('.BLVesselDateType').text(bllabels.VESSELDATE);
	$('.BLStatus').text(bllabels.STATUS);
	$('.BLVesselDate').html(bllabels.BLNO + $('.BLVesselDate').html());
}

function closeBLpopup() {
	// $('#btnBLRegisterDialogOk').prop('disabled',false);
	// $('#btnBLRegisterDialogAdd').prop('disabled',false);
	// $('#txtBLRegBLNo').val('');
	// $('#txtBLRegCutomerName').val('');
	console.log('Closing BL Add dialog');
	$('#btnRegBlPopupClose').click();
	$('#btnRegBlMyPopupClose').click();

}

$(document).one('pagebeforecreate', function() {
	$("#left-panel").panel().enhanceWithin();
});

function showProformaRequestDetails() {

	var blNumber = $('#txtProformaBLNumber').val();

	if (blNumber.trim() == "") {
		window.Toast.show(errMessage.blNumberEmpty);
		return;
	}

	var ProformaRequestDetails = {
		"BLNumber" : blNumber,
		"LocationId" : LocationId,
		"UserName" : userName
	};

	$.ajax({
		url : api_url + 'BLStatusOutput/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(ProformaRequestDetails),
		success : function(response) {
			if (response.ErrorMessage == "" || response.ErrorMessage === null) {
				response.Amount = formatAmount(response.Amount);
				var ProformaRequestTemplate = Handlebars.compile($(
						"#tplProformaRequest").html());
				$('#dvProformeInvoiceBody').html(
						ProformaRequestTemplate(response));
				/*for ( var i in locale.ProformaOptions) {
					$('#lstProformOptions').append(
							'<option value="' + i + '">'
									+ locale.ProformaOptions[i] + '</option>');
				}*/  //Comment By Manohar For Dakar
				setProformaRequestLables();
			} else {
				window.Toast.show(response.ErrorMessage);
			}
		}
	});

	// var ProformaRequestTemplate =
	// Handlebars.compile($("#ProformaRequestTemplate").html());
	// $('#dvProformeInvoiceBody').html(ProformaRequestTemplate(blPerformeRequest));
	// setProformaRequestLables();
}

function doRequestForProforma(blNumber) {
	var blPickupDate = $('#txtPickUpDate').val();
	var blCustomerName = $('#txtCustomerName').val();
	var blOptions = "";//$('#lstProformOptions').val(); comment by Manohar

/*	if (blPickupDate.trim() == "") {
		window.Toast.show(errMessage.blPickUpDateEmpty);
		return;
	}

	if (blCustomerName.trim() == "") {
		window.Toast.show(errMessage.blCustomerNameEmpty);
		return;
	}
*/
	var ProformaRequestDetails = {
		"BLNumber" : blNumber,
		"LocationId" : LocationId,
		"PickupDate" : blPickupDate,
		"Options" : blOptions
	};
	
	
/*var ProformaRequestDetails = {
"BLNumber":"govind",
"PickupDate":"",
"Options":"A",
"LocationId":"3"
};*/
 
	// alert(JSON.stringify(ProformaRequestDetails));
	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});

	$.ajax({
		url : api_url + 'BLInvoiceContainer/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(ProformaRequestDetails),
		success : function(response) {
			$.mobile.loading("hide");
			var resJSON = JSON.parse(response);
			
			Handlebars.registerHelper("bindData", function(amount) {
				  return amount.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, ".");
			});
			var templateSource = $("#billDetails").html(),

			template = Handlebars.compile(templateSource),
			
			studentHTML = template(resJSON);
			
			$('#divBillDetails').html(studentHTML);
			
			$.mobile.changePage("#dvInvoicePage");
			
		},
		timeout: 30000,
		error: function(x, t, m) {
			$.mobile.loading("hide");
		        
			 navigator.notification.alert("Request Failed.", null,
						errMessage.Title, locale.AlertOK);
		        
		}
	});
}

function initInvoiceScreen() {
	$('#BLInvoicePage').html('');
	var BLStatusDetails = {
		"UserName" : userName,
		"BLNumber" : $('#txtProformaBLNumber').val(),
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'BLStatusOutput/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLStatusDetails),
		success : function(response) {
			if (response.ErrorMessage == "" || response.ErrorMessage == null) {

				response.Amount = "CFA "
					+ response.Amount.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, ".");

				
				BLStatusNumber = -1;
				$('#imgBLInvoiceQrCode').unbind();
				var BLInvoiceTemplate = Handlebars.compile($(
						"#BLInvoiceTemplate").html());
				$('#dvInvoice').html(BLInvoiceTemplate(response));

				$('#imgBLInvoiceQrCode').prop(
						'src',
						api_url + 'BLStatusQRCODE/' + userName + '/'
								+ response.InvoiceNo + '/' + LocationId);

				setBLLables();
			} else {
				window.Toast.show(response.ErrorMessage);
			}
		},
		error : function(response) {
			$('#dvloadingScreen').hide();
			
		}
	});
}

function setProformaRequestLables() {

	// $('#lblProformaInvoiceBlNum').text(locale.ProformaInvoiceBlNum);
	$('#lblProformaInvoiceHeaderBlNum').text(locale.ProformaInvoiceBlNum);
	$('#lblProformaInvoiceComponent').text(locale.ProformaInvoiceComponent);
	$('#lblProformaInvoiceLocation').text(locale.ProformaInvoiceLocation);
	$('#lblProformaInvoiceContainerCount').text(
			locale.ProformaInvoiceContainerCount);
	$('#lblProformaInvoiceCustomStatus').text(
			locale.ProformaInvoiceCustomStatus);
	$('#lblProformaInvoiceNextAction').text(locale.ProformaInvoiceNextAction);
	$('#lblProformaInvoiceShippingLine').text(
			locale.ProformaInvoiceShippingLine);
	$('#lblProformaInvoiceAgent').text(locale.ProformaInvoiceAgent);
	$('#lblProformaInvoicePickUpDate').text(locale.ProformaInvoicePickUpDate);
	$('#lblProformaInvoiceAllContainer').text(
			locale.ProformaInvoiceAllContainer);
	$('#lblProformaInvoiceCustomerName').text(
			locale.ProformaInvoiceCustomerName);
	$('#lblProformaInvoiceInvoiceAmount').text(
			locale.ProformaInvoiceInvoiceAmount);
	$('#btnProformaInvoice').text(locale.ProformaInvoicebtn);
	$('#btnProformaInvoiceGen').text(locale.ProformaInvoiceGenbtn);
	$('#lblProformaInvoiceNote').text(locale.ProformaInvoiceNote);
}

var BLStatusWrapperWidth = 0;
var BLStatusSwipe;
var BLStatusCurrentPageWidth = 0;
var SwipePageWindowWidth = (($(window).width()) - 2);

function updateBLStatusLayout() {
	var currentPage = 0;
	if (BLStatusWrapperWidth > 0) {
		currentPage = -Math.ceil($('#BLStatusPageScroller').position().left
				/ BLStatusWrapperWidth);

	}
	BLStatusWrapperWidth = $('#BLStatuspageWrapper').width();
	$('#BLStatusPageScroller').css('width', BLStatusWrapperWidth * 3);
	$('.page').css('width', BLStatusWrapperWidth);
	BLStatusSwipe.refresh();
	BLStatusSwipe.scrollTo(currentPage, 0, 0);
	console.log($(window).width());

	BLStatusCurrentPageWidth = 0;
}

function CurrentPage(page) {
	// alert(page+""+CurPageSwipe);
	if (CurPageSwipe === "BLStatusPages") {
		$('#ulBLStatusFooterTabs').find('a').removeClass('ui-btn-active');
		if (page === 0) {
			$('#ulBLStatusFooterTabs').find('.tab-blStatus').addClass(
					'ui-btn-active');
		} else if (page === 1) {
			$('#ulBLStatusFooterTabs').find('.tab-blHistory').addClass(
					'ui-btn-active');
		} else if (page === 2) {
			$('#ulBLStatusFooterTabs').find('.tab-blInvoice').addClass(
					'ui-btn-active');
		}
	} else if (CurPageSwipe === "ContainerInfoPages") {
		$('#ulContInfoFooterTabs').find('a').removeClass('ui-btn-active');
		if (page === 0) {
			$('#ulContInfoFooterTabs').find('#btn-tab-ContBasic').addClass(
					'ui-btn-active');
		} else if (page === 1) {
			$('#ulContInfoFooterTabs').find('#btn-tab-ContHistory').addClass(
					'ui-btn-active');
		} else if (page === 2) {
			$('#ulContInfoFooterTabs').find('#btn-tab-ContDocs').addClass(
					'ui-btn-active');
		} else if (page === 3) {
			$('#ulContInfoFooterTabs').find('#btn-tab-ContHaz').addClass(
					'ui-btn-active');
			$('#ulContInfoFooterTabs').find('#btn-tab-ContOog').addClass(
					'ui-btn-active');
		}
	}
}

function switchBLStatusTabs(pageNo) {
	var BLStatusWrapperWidth = $('#BLStatuspageWrapper').width() * -1;
	BLStatusSwipe.scrollTo(pageNo * BLStatusWrapperWidth, 0, 500);
	CurPageSwipe = "BLStatusPages";
	CurrentPage(pageNo)
}

function initBLStatus() {
	CurPageSwipe = "BLStatusPages";
	var tplPaymentPendingList = Handlebars.compile($("#tplBLStatusSwipe")
			.html());
	$('#blStatusPageContent').html(tplPaymentPendingList());

	BLStatusSwipe = new iScroll('BLStatuspageWrapper', {
		snap : true,
		momentum : false,
		hScrollbar : false,
		vScrollbar : false,
		lockDirection : true
	});
	updateBLStatusLayout();
}

function showBLStatus() {

	// $('#dvBLStatusScreen').find('.dvBLHide').hide();
	// $('#dvBlStatusFooter').hide();
	if ($('#txtBlNumber').val().trim() == "") {
		navigator.notification.alert(errMessage.blNumberEmpty, null,
				errMessage.Title, locale.AlertOK);
		// window.Toast.show(errMessage.blNumberEmpty);
		return;
	}

	BLStatusFlag = 1;

	var BLStatusDetails = {
		"UserName" : userName,
		"BLNumber" : $('#txtBlNumber').val(),
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'BLStatusOutput/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLStatusDetails),
		success : function(response) {
			if (response.ErrorMessage == "" || response.ErrorMessage == null) {
				response.Amount = "CFA "
					+ response.Amount.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, ".");
				BLStatusNumber = -1;

				var BLStatusTemplate = Handlebars.compile($("#tplBLStatus")
						.html());
				$('#BLStatusPage').html(BLStatusTemplate(response));

				var BLHistoryTemplate = Handlebars.compile($(
						"#tplBLHistoryList").html());
				$('#BLHistoryPage').html(BLHistoryTemplate(response.History));

				var BLInvoiceTemplate = Handlebars.compile($("#tplBLInvoice")
						.html());
				$('#BLInvoicePage').html(BLInvoiceTemplate(response));

				$('#imgBLInvoiceQrCode').prop(
						'src',
						api_url + 'BLStatusQRCODE/' + userName + '/'
								+ response.InvoiceNo + '/' + LocationId);

				setBLLables();
				$('#BLStatusPageScroller').find('.page').height(
						$(window).height()
								- ($('#dvBLStatusFooterTabs').height() + 45));
			} else {
				window.Toast.show(response.ErrorMessage);
			}
		},
		error : function(response) {
			$('#dvloadingScreen').hide();
		}
	});
}

function setBLLables() {
	// $('#lblBlStatusCommodity').text(locale.BlStatusCommodity);
	$('#lblBlStatusContainer').text(locale.BlStatusContainer);
	$('#lblBlStatusLocation').text(locale.BlStatusLocation);
	$('#lblBlStatusCustomsHold').text(locale.BlStatusCustomsHold);
	$('#lblBlStatusCurrentStatus').text(locale.BlStatusCurrentStatus);
	$('#lblBlStatusNextAction').text(locale.BlStatusNextAction);
	$('#lblBlStatusFinanceHold').text(locale.BlStatusFinanceHold);
	$('#lblBlStatusShippingLine').text(locale.BlStatusShippingLine);
	$('#lblBlStatusShippingAgent').text(locale.BlStatusShippingAgent);
	$('#lblBlStatusNote').text(locale.BlStatusNote);
	$('#lblBlStatusNoteDesc').text(locale.BlStatusNoteDesc);
	$('.lblBlStatusCurrentStatus').text(locale.BlStatusCurrentStatus);
	$('.lblBlStatusNextAction').text(locale.BlStatusNextAction);
	$('#lblBlHistory').text(locale.BLHistory);
	$('#lblINVInvoiceNo').text(locale.BLInvoiceNo);
	$('#lblINVCustomer').text(locale.BLCustomerName);
	$('#lblINVAmount').text(locale.BLAmount);
	$('#lblINVExpiryDate').text(locale.BLExpiryDate);

}

function setOpenBLLables() {

	$('#lblOpenBlStatusContainer').text(locale.BlStatusContainer);
	$('#lblOpenBlStatusLocation').text(locale.BlStatusLocation);
	$('#lblOpenBlStatusCustomsHold').text(locale.BlStatusCustomsHold);
	$('#lblOpenBlStatusCurrentStatus').text(locale.BlStatusCurrentStatus);
	$('#lblOpenBlStatusNextAction').text(locale.BlStatusLocation);
}

function NavigateTOBLStatus(id, status) {

	BLNoArr.length = 0;
	if (status == 'NEW') {
		$('#txtOpenBlNumber').val(id);
	} else {

		$('#txtBlNumber').val(id);
	}
	setTimeout(function() {
		if (status == 'NEW') {

			showOpenBLStatus();
		} else {
			showBLStatus();
		}

	}, 500);
}

function toggleFilterDiv() {
	if ($('#lstMyBlGroupOptions option:selected').text() == "Date") {
		$('#dvBLFilterSpecificDate').fadeIn();
	} else {
		$('#dvBLFilterSpecificDate').hide();
		$('#txtGroupByValue').prop('placeholder',
				$('#lstMyBlGroupOptions option:selected').text());
	}
}

var paramContainerData;
function showContainerInfo(contId) {
	// paramContainerId = contId;

	var params = {
		"ContId" : contId
	};

	$.ajax({
		url : api_url + 'ContainerInfo/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(params),
		success : function(response) {
			paramContainerData = response;
			window.location = "#dvContainerInfoPage";
		}
	});
	//	
}

function saveFilterSettings() {

	var CustomerName = $('#txtFilterByCustomerName').val();
	var status = $('#txtFilterByStatus').val();
	var vessel = $('#txtFilterByVessel').val();
	var blNo = $('#txtFilterByBL').val();
	var fromDate = $('#txtFilterByDateFrom').val();
	var toDate = $('#txtFilterByDateTo').val();

	var selectedGroupByVal = $('#lstMyBlGroupOptions option:selected').val();

	var filterBySettings = {
		"FilterBy" : [ {
			"Key" : "Customer Name",
			"value" : CustomerName,
			"userName" : userName,
			"SName" : "MyBL"
		}, {
			"Key" : "Status",
			"value" : status,
			"userName" : userName,
			"SName" : "MyBL"
		}, {
			"Key" : "Vessel",
			"value" : vessel,
			"userName" : userName,
			"SName" : "MyBL"
		}, {
			"Key" : "BlNo",
			"value" : blNo,
			"userName" : userName,
			"SName" : "MyBL"
		}, {
			"Key" : "Date",
			"fromDate" : fromDate,
			"toDate" : toDate,
			"userName" : userName,
			"SName" : "MyBL"
		} ],
		"GroupBy" : selectedGroupByVal,
	}

	alert(JSON.stringify(filterBySettings));

	$.ajax({
		url : api_url + 'MYBLSettingUpdate/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(filterBySettings),
		success : function(response) {

			if (response.ErrorMessage = "") {

			} else {
				window.Toast.show(response.ErrorMessage);
			}
		}
	});
}

function restoreFilterSettings() {

	$.ajax({
		url : api_url + 'MYBLSettingUpdate/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(filterBySettings),
		success : function(response) {

			$('#txtFilterByCustomerName').text();
			$('#txtFilterByStatus').text();
			$('#txtFilterByVessel').text();
			$('#txtFilterByBL').text();
			$('#txtFilterByDateFrom').text();
			$('#txtFilterByDateTo').text();
		}
	});
}

var ContainerWrapperWidth = 0;
var ContainerSwipe;

function updateContainerLayout() {
	var currentPage = 0;
	if (ContainerWrapperWidth > 0) {
		currentPage = -Math.ceil($('#ContainerPageScroller').position().left
				/ ContainerWrapperWidth);
	}
	ContainerWrapperWidth = $('#ContainerPageWrapper').width();
	$('#ContainerPageScroller').css('width',
			ContainerWrapperWidth * containerPages);
	$('.page').css('width', ContainerWrapperWidth);
	ContainerSwipe.refresh();
	ContainerSwipe.scrollTo(currentPage, 0, 0);
}

function switchContainerTabs(pageNo) {
	var ContainerWrapperWidth = $('#ContainerPageWrapper').width() * -1;
	ContainerSwipe.scrollTo(pageNo * ContainerWrapperWidth, 0, 500);
	CurPageSwipe = "ContainerInfoPages";
	CurrentPage(pageNo)
}

var containerPages;

function initContainerInfo() {
	CurPageSwipe = "ContainerInfoPages";
	if (paramContainerData.Commodity.toUpperCase().search("GEN") > -1) {
		containerPages = 3;
	} else if (paramContainerData.Commodity.toUpperCase().search("HAZ") > -1) {
		containerPages = 4;
	} else if (paramContainerData.Commodity.search("Out of Guage") > -1) {
		containerPages = 4;
	}else {
		containerPages = 3;
	}

	var containerTemplate = Handlebars.compile($("#tplContTabs").html());
	$('#dvContainerInfoFooterTab').html(containerTemplate(paramContainerData))
			.trigger('create');
	// $('#dvContainerInfoFooterTab').;
	// $('#blStatusPageContent').html('');
	$.mobile.loading("show", {
		text : "Loading",
		textonly : false,
		textVisible : true,
		theme : "b",
		html : ""
	});
	setTimeout(function() {
		var ContainerInfoSwipeTemplate = Handlebars.compile($(
				"#tplContainerInfoSwipe").html());
		$('#dvContainerInfoBody').html(
				ContainerInfoSwipeTemplate(paramContainerData));
		document.addEventListener("orientationchange", updateContainerLayout);
		ContainerSwipe = new iScroll('ContainerPageWrapper', {
			snap : true,
			momentum : false,
			hScrollbar : false,
			vScrollbar : false,
			lockDirection : true
		});
		updateContainerLayout();
		setContainerInfoData();
		$.mobile.loading("hide");
	}, 500);
}

function setContainerInfoData() {

	var params = {
		"ContId" : paramContainerId
	};

	// $.ajax({
	// url : api_url + 'ContainerInfo/',
	// type : 'POST',
	// contentType : 'application/json; charset=utf-8',
	// data : JSON.stringify(params),
	// success : function(response) {

	var containerTemplate = Handlebars
			.compile($("#tplContainerDetails").html());
	$('.dvContainerInfoData').html(containerTemplate(paramContainerData));

	var containerDetailsTemplate = Handlebars.compile($("#tplContainerInfo")
			.html());
	$('#dvContainerBasicInfo').html(
			containerDetailsTemplate(paramContainerData));

	var containerHistoryTemplate = Handlebars.compile($("#tplContainerHistory")
			.html());
	$('#dvContainerHistory').html(containerHistoryTemplate(paramContainerData));

	var containerDocTemplate = Handlebars.compile($(
			"#tplContainerDocumentation").html());
	$('#dvContainerDocs').html(containerDocTemplate(paramContainerData));

	var containerHazInfoTemplate = Handlebars.compile($("#tplContainerHAZInfo")
			.html());
	$('#dvContainerHAZ').html(containerHazInfoTemplate(paramContainerData));

	var containerODCInfoTemplate = Handlebars.compile($("#tplcontainerODCInfo")
			.html());
	$('#dvContainerOog').html(containerODCInfoTemplate(paramContainerData));

	/*
	 * var containerDetailsTemplate =
	 * Handlebars.compile($("#ContainerDetailsTemplate").html());
	 * $('#dvContainerBasicInfo').html(containerDetailsTemplate(containerData));
	 */
	// ContainerHistoryTemplate
	$('#ContainerPageScroller').find('.page')
			.height(
					$(window).height()
							- ($('#dvContainerInfoFooterTab').height() + 45));

	setScreenLabels();
	// }
	// });
}

Handlebars.registerHelper('ifHAZ', function(commodity, options) {
	if (commodity.toUpperCase().search("HAZ") > -1) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifOOG', function(commodity, options) {
	if (commodity.search("Out of Guage") > -1) {
		return options.fn(this);
	}
	return options.inverse(this);
});

function testLogin() {
	window.location = "#dvHomePage";
}

function initVessele() {

	var myBLDetails = {
		"UserName" : userName,
		"LocationId" : LocationId
	};
	$.ajax({
		url : api_url + 'VesselInfo/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(myBLDetails),
		success : function(response) {
			// alert(response);
			var VesselList = StringToJson(response);
			var tplVesselList = Handlebars.compile($("#tplVesselList").html());
			$('#lstVesseleList').html(tplVesselList(VesselList));
		}
	});

}

function initSetting() {

	var optionsTemplate = Handlebars.compile($("#tplOptionsList").html());

	$('#lstSettingLanguage').html(optionsTemplate(locale.languagesList));

	$('#lstSettingTerminal').html(optionsTemplate(terminals));

	if (settingMobileNo != null) {
		var mobileNoToSplit = settingMobileNo;
		var countryCode = mobileNoToSplit.slice(0, 2);
		var mobileNo = mobileNoToSplit.slice(3, 13);
	}
	$('#txtSettingUserName').val(userName);
	$('#txtSettingEmailId').val(settingEmailId);
	$('#txtSettingCountryCode').val(countryCode);
	$('#txtSettingPhoneNumber').val(mobileNo);
	$("#lstSettingLanguage").val(Language);
	$('#lstSettingLanguage').selectmenu('refresh');
	$.each(locale.locations[(LocationId - 1)], function(key, value) {
		$('#lstSettingTerminal :selected').text(value);

	})
	$.each(locale.UserTypes[(CustomerType - 1)], function(key, value) {
		$('#txtSettingUserType').val(value);

	})
	if (CustomerType == 1 || CustomerType == 6 || CustomerType == 7) {
		$('#lblSettingCompanyName').show();
		$('#txtSettingCompanyName').show();
	} else {
		$('#lblSettingCompanyName').hide();
		$('#txtSettingCompanyName').hide();
	}

	window.location = "#dvSetting";
}

function GetEstimateValue(blNo) {
	
	if ($('#txtPickUpDate').val() == "") {
		navigator.notification.alert(errMessage.pickupDate, null,
				errMessage.Title, locale.AlertOK);
		return;
	}
	$('#btnProformaInvoiceGen').prop("disabled", true);

	 alert("UserName :"+userName);
	var EstimateValue = {
		BLNumber : blNo,
		LocationId : LocationId,
		PickupDate : $('#txtPickUpDate').val(),
		UserName : userName+"",
		Options : ""	
	};
//$('#lstProformOptions').val()  comment by manohar
	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});

	$.ajax({
		url : api_url + 'GetEstimateValue/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(EstimateValue),
		timeout: 30000,
		success : function(response) {
			$.mobile.loading("hide");
			$('#btnProformaInvoiceGen').prop("disabled", false);

			if (response.ErrorMessage == "" || response.ErrorMessage == null) {
				$('#proformaAmt').text(
						"CFA "
								+ response.Amount.toString().replace(
										/\B(?=(\d{3})+(?!\d))/g, "."));
			}
		},
		 error: function(x, t, m) {
			 $.mobile.loading("hide");
			 $('#btnProformaInvoiceGen').prop("disabled", false);

			 navigator.notification.alert("Request Failed.", null,
						errMessage.Title, locale.AlertOK);
		}
	});

}

function initVesseleInfo() {
	// alert("Hello");
}

Handlebars.registerHelper('ifNew', function(status, options) {
	if (status === "NEW") {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifPaid', function(status, options) {
	if (status === "PAID") {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifPartial', function(status, options) {
	if (status === "PARTIAL") {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifVerified', function(status, options) {
	if (status === "VERIFIED") {
		return options.fn(this);
	}
	return options.inverse(this);
});



Handlebars.registerHelper('ifClosed', function(status, options) {
	if (status === "CLOSED") {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifInvalid', function(status, options) {
	if (status === "INVALID") {
		return options.fn(this);
	}
	return options.inverse(this);
});


Handlebars.registerHelper('ifEtaAta', function(EtaAta, options) {
	if (EtaAta === "ETA") {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('ifcnt', function(count, options) {
	if (count > 0) {
		console.log("count", count);
		$("#notification_count").show();
		$("#notification_count").text(count);
		$("#notificationContainer").hide();
		notificationStatus = 1;
		return options.fn(this);
	} else {
		console.log("count", count);
		$("#notification_count").hide();
		notificationStatus = 0;
		return options.inverse(this);
	}
});

function saveSettings() {
	console.log('Saving setting');

	if ($('#txtSettingNewPassword').val().trim() != "") {
		if ($('#txtSettingNewPassword').val().length > 8) {
			navigator.notification.alert(errMessage.signUpPasswordMinCharacters,
					null, errMessage.Title, locale.AlertOK);
			return;
		}

		if ($('#txtSettingConfirmPassword').val().trim() == "") {
			navigator.notification.alert(errMessage.signUpConfirmPasswordEmpty,
					null, errMessage.Title, locale.AlertOK);
			return;
		}

		if ($('#txtSettingNewPassword').val() != $('#txtSettingConfirmPassword')
				.val()) {
			navigator.notification.alert(errMessage.signUpPasswordNotMatch, null,
					errMessage.Title, locale.AlertOK);
			return;
		}
	}


	if ($('#txtSettingEmailId').val().trim() != "") {
		if (!validateEmail($('#txtSettingEmailId').val())) {
			navigator.notification.alert(errMessage.signUpEmailIdInValid, null,
					errMessage.Title, locale.AlertOK);
			return;
		}
	}


	if ($('#txtSettingCountryCode').val() != "") {
		if (isNaN($('#txtSettingCountryCode').val())) {
			navigator.notification.alert(errMessage.signUpCountryCodeInvalid, null,
					errMessage.Title, locale.AlertOK);
			return;
		}
	}


	if ($('#txtSettingPhoneNumber').val() != "") {
		if (isNaN($('#txtSettingPhoneNumber').val())) {
			navigator.notification.alert(errMessage.signUpPhoneNumberNotValid,
					null, errMessage.Title, locale.AlertOK);
			return;
		}
	}


	if ($('#txtSettingLanguage').val() == "") {
		navigator.notification.alert(errMessage.signUpUserNameEmpty, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (hasWhiteSpace($('#txtSettingLanguage').val())) {
		navigator.notification.alert(errMessage.signUpUserNameSpace, null,
				errMessage.Title, locale.AlertOK);
		return;
	}

	if (!isString($('#txtSettingLanguage').val())) {
		navigator.notification.alert(errMessage.signUpUserNameSpecialCharacter,
				null, errMessage.Title, locale.AlertOK);
		return;
	}

	
	  var UserSettings = {Username:userName,
			  Password:$('#txtSettingNewPassword').val(),
			  MailId:$('#txtSettingEmailId').val(),
			  MobileNo:$('#txtSettingPhoneNumber').val(),
	  Language:$('#txtSettingLanguage').val()};

	  $.ajax({ url : api_url + 'UserModification/', type : 'POST', contentType :
	  'application/json; charset=utf-8', data : JSON.stringify(UserSettings),
	  success : function(response) { if (response.ErrorMessage == "" ||
	  response.ErrorMessage == null) {
	  navigator.notification.alert(successMessage.userSettingMessage, null,
	  successMessage.Title, locale.AlertOK); 
	  initHomeScreen();
	  } } });
	 
}

function showProformaForBL(blNumber) {
	$('#txtProformaBLNumber').val(blNumber);
	window.location = "#dvProformaInvoice";
}

function notificationClearAll() {
	
	  var notificationUpdateDetails = {"UserName": userName};
	  
	  $.ajax({ url : api_url + 'NotificationClearAll/', 
		  type : 'POST', 
		  contentType : 'application/json; charset=utf-8', 
		  data : JSON.stringify(notificationUpdateDetails), 
		  success : function(response) { 
			  if (response.ErrorMessage == "" || response.ErrorMessage == null) { 
				  
				  var notificationDetails = {"UserName": userName}; 
				  
				  $.ajax({ 
				  	url : api_url + 'NotificationList/', 
				  	type : 'POST', 
					  contentType : 'application/json;charset=utf-8', 
					  data : JSON.stringify(notificationDetails), 
				  	success : function(response) { 
				  		console.log("Got Response: " + response);
						  // if (response.ErrorMessage == "") { 
						  	var jsonResponse = StringToJson(response);
							 // alert(jsonResponse);
							  console.log("Notification json",jsonResponse);
							  var notificationTemplate = Handlebars.compile($("#tplnotificattion").html());
							  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
				  
							  var notificationTemplateList =
							  Handlebars.compile($("#tplnotificattionList").html());
							  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
							// }
				  	// 	else{
				  	// 		alert(response.ErrorMessage);
				  	// 	} 
				  	} 
				  });
				  
				  setInterval(function() { 
					  $.ajax({ 
					  	url : api_url + 'NotificationList/', 
						  type :'POST', 
						  contentType : 'application/json; charset=utf-8', 
						  data :JSON.stringify(notificationDetails), 
						  success : function(response) { 
						  	// if(response.ErrorMessage == "") { 
						  		var jsonResponse =
								  StringToJson(response); 
								  console.log("Notification json",jsonResponse);
								  
								  var notificationTemplate =
								  Handlebars.compile($("#tplnotificattion").html());
								  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
								  
								  var notificationTemplateList =
								  Handlebars.compile($("#tplnotificattionList").html());
								  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
								// }
						  // 	else {
						  // 		alert(response.ErrorMessage);
						  // 	} 
						  } 
						}); 
					}, 15000);
			  
			  
			  
			  
			  } } });
	 
}

function notificationClicked(id) {
	$("#notificationContainer").hide();
	
	  var notificationUpdateDetails = {"id": id}; 
	  
	  $.ajax({ url : api_url + 'NotificationClearId/', 
	  type : 'POST', 
	  contentType : 'application/json; charset=utf-8', 
	  data : JSON.stringify(notificationUpdateDetails), 
	  success :	  function(response) 
	  { if (response.ErrorMessage == "" || response.ErrorMessage == null) {

	  
	  
		  var notificationDetails = {"UserName": userName}; 
		  
		  $.ajax({ 
		  	url : api_url + 'NotificationList/', 
		  	type : 'POST', 
			  contentType : 'application/json;charset=utf-8', 
			  data : JSON.stringify(notificationDetails), 
		  	success : function(response) { 
		  		console.log("Got Response: " + response);
				  // if (response.ErrorMessage == "") { 
				  	var jsonResponse = StringToJson(response);
					 // alert(jsonResponse);
					  console.log("Notification json",jsonResponse);
					  var notificationTemplate = Handlebars.compile($("#tplnotificattion").html());
					  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
		  
					  var notificationTemplateList =
					  Handlebars.compile($("#tplnotificattionList").html());
					  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
					// }
		  	// 	else{
		  	// 		alert(response.ErrorMessage);
		  	// 	} 
		  	} 
		  });
		  
		  setInterval(function() { 
			  $.ajax({ 
			  	url : api_url + 'NotificationList/', 
				  type :'POST', 
				  contentType : 'application/json; charset=utf-8', 
				  data :JSON.stringify(notificationDetails), 
				  success : function(response) { 
				  	// if(response.ErrorMessage == "") { 
				  		var jsonResponse =
						  StringToJson(response); 
						  console.log("Notification json",jsonResponse);
						  
						  var notificationTemplate =
						  Handlebars.compile($("#tplnotificattion").html());
						  $('#dvpgHeader').html(notificationTemplate({notfc:jsonResponse}));
						  
						  var notificationTemplateList =
						  Handlebars.compile($("#tplnotificattionList").html());
						  $('#notificationsBody').html(notificationTemplateList({notfc:jsonResponse})); 
						// }
				  // 	else {
				  // 		alert(response.ErrorMessage);
				  // 	} 
				  } 
				}); 
			}, 15000);
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  } } });
	 
}

function showOpenBLStatus() {
	if ($('#txtOpenBlNumber').val().trim() == "") {
		navigator.notification.alert(errMessage.blNumberEmpty, null,
				errMessage.Title, locale.AlertOK);
		// window.Toast.show(errMessage.blNumberEmpty);
		return;
	}

	var BLStatusDetails = {
		"UserName" : userName,
		"BLNumber" : $('#txtOpenBlNumber').val(),
		"LocationId" : LocationId
	};

	$.ajax({
		url : api_url + 'BLStatusOutput/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLStatusDetails),
		success : function(response) {
			if (response.ErrorMessage == "" || response.ErrorMessage == null) {
				response.Amount = "CFA "
					+ response.Amount.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, ",");
				var BLStatusTemplate = Handlebars.compile($("#tplOpenBLStatus")
						.html());
				$('#blOpenStatusPageContent').html(BLStatusTemplate(response));
				setOpenBLLables();

			} else {
				window.Toast.show(response.ErrorMessage);
			}
		},
		error : function(response) {
			$('#dvloadingScreen').hide();
		}
	});
}
function BLGroupClicked(label) {
	currentCustomerName = label;
}

function updateCustomer(page) {
	var name = $("#txtBLChangeCustomer").val();
	if(page === 'MyBL'){
		name = $("#txtMyBLChangeCustomer").val();
	}

	var BLUpdateCustomer = {
		"CustomerName" : name,
		"OldCustomerName" : currentCustomerName,
		"LocationId" : LocationId,
		"UserName" : userName
	};

	$.ajax({
		url : api_url + 'BLCustomerUpdate/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(BLUpdateCustomer),
		success : function(response) {
			if (response.ErrorMessage == "") {
				// alert(response.ErrorMessage);
				return;
			} else {
				alert(response.ErrorMessage);
				return;
			}
		}
	});
	closeBLpopup();
	initHomeScreen();
}

function UpdateCancel(page) {
	if(page === 'Welcome'){
		$("#txtBLChangeCustomer").val("");
	} else {
		$("#txtMyBLChangeCustomer").val("");
	}
	closeBLpopup();
}

function BLHomeDeleteClicked() {
	var selctedBLs = "";
	if (confirm(BLNoArr.length + locale.BLDelete) == true) {
		for (var i = 0; i < BLNoArr.length; i++) {
			
			var BLDeleteData = {
				"BlNumber" : BLNoArr[i],
				"UserName" : userName,
				"LocationId" : LocationId
			};
alert(JSON.stringify(BLDeleteData));
			$.ajax({
				url : api_url + 'BLDelete/',
				type : 'POST',
				contentType : 'application/json; charset=utf-8',
				data : JSON.stringify(BLDeleteData),
				success : function(response) {
					alert(JSON.stringify(response));
					if (response.ErrorMessage == "") {
						return;
					} else {
						alert(response.ErrorMessage);
						return;
					}
				}
			});
		}
		$("#BLDustbinHome").hide();
		initHomeScreen();

	} else {
		//941936217 2942
	}
}

function BLMyBLDeleteClicked() {
	var selctedBLs = "";
	if (confirm(BLNoArr.length + locale.BLDelete) == true) {
		for (var i = 0; i < BLNoArr.length; i++) {
			var BLDeleteData = {
				"BlNumber" : BLNoArr[i],
				"UserName" : userName,
				"LocationId" : LocationId
			};

			$.ajax({
				url : api_url + 'BLDelete/',
				type : 'POST',
				contentType : 'application/json; charset=utf-8',
				data : JSON.stringify(BLDeleteData),
				success : function(response) {
					if (response.ErrorMessage == "") {
						// alert(response.ErrorMessage);
						return;
					} else {
						alert(response.ErrorMessage);
						return;
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                } 
				
			});
		}
		$("#BLDustbin").hide();
		initMYBLs();

	} else {
	}
}
function addCommas(nStr) {
    //nStr += '';
    x = nStr.split('.').replace(',');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function ChangePasswordCancelClicked() {
	navigator.app.exitApp();
}

function ChangePasswordOkClicked() {
	var changePasswordData = {
		"UserName" : $('#txtChangePasswordUserName').val(),
		"Password" : $('#txtChangePasswordOldPassword').val(),
		"NewPassword" : $('#txtChangePasswordNewPassword').val()
	};

	$.ajax({
		url : api_url + 'ChangePassword/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(changePasswordData),
		success : function(response) {
			if (response.ErrorMessage == "") {
				if (UserNotificationStatus == "Y"
						|| UserNotificationStatus == "") {
					showNotifications();
				} else {
					LoginSuccess();
				}
			} else {
				alert(response.ErrorMessage);
				return;
			}
		}
	});
}


function refreshWelcomeScreen() {
	var username = {
			"UserName" : userName
		};

	
	$.mobile.loading("show", {
		text : "Please wait...",
		textVisible : true,
		theme : "b",
		textonly : false,
		html : ""
	});
	
	$.ajax({
		url : api_url + 'Refresh/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(username),
		success : function(response) {
			 $.mobile.loading("hide");
			if (response.ErrorMessage == "") {
				initHomeScreen();
			}
			else
				{				
				alert(response.ErrorMessage);
				return;			
				}
		}
	});

}


function updatePhone() {
	var index = parseInt($('#lstSettingTerminal :selected').val());

	// console.log('Chosen Index ' + index + ', ' + $('#lstSettingTerminal :selected').text());

	var i;
	for(i in terminals){
		var terminal = terminals[i];
		// console.log('Comparing Terminal: ' + terminal.value + ', key: ' + terminal.key + ' with index: ' + index);
		if(parseInt(terminal.key) === index){
			$('#txtSettingCountryCode').val(terminal.countryCode);
			return;
		}
	}

}

function initAdminPage(){
	var liTemplate = Handlebars.compile($("#tplUserList").html());

	console.log('initAdminPage');
	$.ajax({
		url : api_url + 'userall/',
		type : 'POST',
		contentType : 'application/json; charset=utf-8',
		success : function(response) {
			//alert('Response: ' + JSON.stringify(response));
			$('#ulAdminUsersList').html(liTemplate({
					list : response
				}));
		}, 
		error: function(err){
			alert("Error: " + JSON.stringify(err));
		}
	});

//	$('#ulAdminUsersList').html(liTemplate({
//		list : [ {
//			'username': "Gnanesh"
//		}, {
//			'username': "Sokhna"
//		}, {
//			'username': "Ameet"
//		},]
//	}));	
}


function initTemplate(){
	var list = Handlebars.compile($('#tplTemplateUserList').html());

	alert('In initTemplate');
	var result = { users: [
			{name: 'Ameet'}, 
			{name: 'Gnanesh'},
			{name: 'Hamdy'}
			]};

	$('#ulTemplateUsersList').html(list( result));
}




if(debug){
		window.location = '#dvTemplate';
}