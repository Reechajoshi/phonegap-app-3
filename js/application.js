/* 
	jQuery Mobile Boilerplate
	application.js
*/
var appURL = "http://www.qikkle.com/Mirari/api";
var appURL1 =  "http://49.50.79.62:8084/ServiceMirari/rest/hello"
var step1_validation = false;
var step2_validation = false;
var step3_validation = false;
var user_id;
var Total_cost=0;
var paymentMethod = 0;
// var userDetails = {
	// Merchant_Profile: ["1"],
	// UserID: "12",
	// Username: "Richa"
// }
var userDetails = {};
var activeFeed;
var editMarketFeedDiv = '<div id="left" class="edit-market-feed-container"><a href="#" onclick="editFeed(this);"><div class="edit-block-container"><div><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div><div class="edit-block-text">Edit Feed</div></div></a></div>';
var deleteMarketFeedDiv = '<div class="cancel-market-feed-container" id="right"><a href="#" onclick="deleteFeed(_#_FEED_ID_#_);"><div class="cancel-block-container"><div><i class="fa fa-times" aria-hidden="true"></i></div><div class="cancel-block-text">Delete Feed</div></div></a></div>';
var marketFeedTbl = '<table class="market-feed-tbl" id="market-feed-tbl"><tr><td class="market-feed-img-container"><img class="market-feed-company-icon" id="_#_COMPANY_LOGO_#_" scr="images/default-logo.png" style="width:20px;height:20px;"></td><td class="market-feed-td"><div class="market-feed-company-name">_#_COMPANY_NAME_#_</div><div class="market-feed-company-desc">_#_DESCRIPTION_#_</div></td><td class="market-feed-td"><span class="market-feed-time">_#_TIME_#_</span></td></tr><tr><td colspan="3"><span class="market-feeds-like"><i class="fa fa-heart" style="color:red;" aria-hidden="true"></i><span class="market-feed-likes-count">_#_LIKES_#_ Likes</span> </span> <span class="market-feeds-like"><i class="fa fa-comments" style="color:green;" aria-hidden="true"></i><span class="market-feed-comments-count"><a href="#" class="no-format" onclick="showComments(this,_#_FEED_ID_#_);">_#_COMMENTS_#_ Comments</a></span></span></td></tr></table>';

var editActiveOfferDiv = '<div id="left" class="edit-active-offers-container"><div class="renew-block-container"><div><i class="fa fa-refresh" aria-hidden="true"></i></div><div class="renew-block-text">Renew</div></div></div>';
var activeOffersTbl = '<table class="active-offer-tbl" id="active-offer-tbl"><tr><td class="active-offer-img-container"><div class="_#_CODE_COLOR_#_">_#_COUPOUN_CODE_#_</div></td><td class="active-offer-td"><div class="active-offer-company-name">_#_COUPOUN_NAME_#_</div><div class="active-offer-company-desc">_#_COUPOUN_DESCRIPTION_#_</div></td></tr><tr><td colspan="2"><span class="active-offers-usage"><i class="fa fa-bar-chart" style="color:#51A7F9;" aria-hidden="true"></i><span class="active-offers-usage-count">_#_COUPOUN_USAGE_#_ Used This</span> </span> <span class="active-offers-duration"><i class="fa fa-times" style="color:#EC5D57;" aria-hidden="true"></i><span class="active-offers-duration-count">_#_COUPOUN_DURATION_#_</span></span></td></tr></table>';

var profile_cost=0;
var chat_cost=0;
var user_cost=0;
var publish_cost=0;
var service_cost=0;
var vat_cost=0;
var saleContact;
var sales_offer,offer_amount=0;

var templateKeys = {
	"marketFeed" : {
		"companyName": "_#_COMPANY_NAME_#_",
		"companyDesc": "_#_DESCRIPTION_#_",
		"time": "_#_TIME_#_",
		"likes": "_#_LIKES_#_",
		"logo": "_#_COMPANY_LOGO_#_",
		"comments": "_#_COMMENTS_#_",
	},
	"activeOffers": {
		"code_color": "_#_CODE_COLOR_#_",
		"coupoun_code" : "_#_COUPOUN_CODE_#_",
		"coupoun_name" : "_#_COUPOUN_NAME_#_",
		"coupoun_description" : "_#_COUPOUN_DESCRIPTION_#_",
		"coupoun_duration" : "_#_COUPOUN_DURATION_#_",
		"coupoun_usage" : "_#_COUPOUN_USAGE_#_"
	}
}

$(document).on("pageshow","#splash",function(){
	setTimeout(function(){
		$.mobile.changePage("#login-screen", "fade");
	}, 500);
});

$( document ).on( "pageinit", "#market-feed", function() {
	// populate market feed:
	
	var passwordDetails = {
		company_id : 1,
	};
		$.ajax({
			url: appURL1+"/getMerchant_feeds", 
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(passwordDetails),
			success: function(result){
				
				if(result.status == "Success") {
					var marketFeeds = result.lst;
					// var marketFeeds = [["1", "2", '3', "4", "5", "6", "7"]];
					var marketFeedsLength = marketFeeds.length;
					var marketFeedDiv = $("#market-feed-div");
					
					for(var i=0;i<marketFeedsLength;i++) {
						var feedContainer = $("<div/>").addClass("feed-container");
						
						console.log(marketFeedTbl);
						var marketFeedTblHTML = marketFeedTbl.replace(templateKeys.marketFeed.companyName, marketFeeds[i][5]).replace(templateKeys.marketFeed.companyDesc, marketFeeds[i][1]).replace(templateKeys.marketFeed.time, marketFeeds[i][4]).replace(templateKeys.marketFeed.likes, marketFeeds[i][0]).replace(templateKeys.marketFeed.comments, marketFeeds[i][7]).replace(templateKeys.marketFeed.logo, 'comlogo'+i).replace("_#_FEED_ID_#_", "'"+marketFeeds[i][0]+"'");
						var deleteFeedHTML = deleteMarketFeedDiv.replace("_#_FEED_ID_#_", "'"+marketFeeds[i][0]+"'");
						
						$(feedContainer).append(editMarketFeedDiv);
						$(feedContainer).append(marketFeedTblHTML);
						$(feedContainer).append(deleteFeedHTML);
						$(marketFeedDiv).append($(feedContainer));
						showNewFeed1('comlogo'+i);
					}
					
					$( ".market-feed-tbl" ).on( "swiperight", function( e ) {
						if($(this).parent().find("#right").is(":visible")){
							$(this).parent().find("#right").hide("slide", { direction: "right" }, 500);
							$(this).parent().find("#market-feed-tbl").animate({
								'marginLeft' : "0px" //moves left
							});
						} else {
							$(this).parent().find("#left").show("slide", { direction: "left" }, 500);
							$(this).parent().find("#market-feed-tbl").animate({
								'marginLeft' : "100px" //moves left
							});
						}
					});
					
					$( ".market-feed-tbl" ).on( "swipeleft", function( e ) {
						if($(this).parent().find("#left").is(":visible")){
							$(this).parent().find("#left").hide("slide", { direction: "left" }, 500);
							$(this).parent().find("#market-feed-tbl").animate({
								'marginLeft' : "0px" //moves left
							});
						} else {
							$(this).parent().find("#right").show("slide", { direction: "right" }, 500);
							$(this).parent().find("#market-feed-tbl").animate({
								'marginLeft' : "-100px" //moves left
							});
						}
					});
					
				} else {
					alert(result.message);
				}
				},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	
});


function payment_summary() {
		$("#summary-tbl").html('<tr><td class="gray-text">Profile Setup</td><td> — </td><td>Rs.'+
			profile_cost+
		'</td></tr><tr>'+
		'<td class="gray-text">Feed Cost</td><td> - </td><td>Rs.'+
			publish_cost+
		'</td></tr>'+
	'<tr><td class="gray-text">Chat Option</td><td> -	</td><td>Rs.'+
			chat_cost+
		'</td></tr>'+
		'<tr><td class="gray-text">User Cost</td><td>Rs.'+
			'1,500 x 3'+
		'</td><td>Rs.'+
			'4.500'+
		'</td></tr>'+
	'<tr><td colspan="2">Total</td><td>Rs.'+
			(Total_cost-offer_amount)+
		'</td></tr>');
}

$( document ).on( "pageinit", "#company-profile", function() {
	$(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
      $(".center").slick({
        dots: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3
      });
      $(".variable").slick({
        dots: true,
        infinite: true,
        variableWidth: true
      });
});	
							
$( document ).on( "pageinit", "#register-screen-3", function() {
	
		$.ajax({
			url: appURL + "/Registration/getFeatureCost", 
			success: function(result){
				if(result.Status == "Success") {
					//alert("Cost found.");
					$.each( result.feature_cost, function(i, obj) {
					  profile_cost=obj.basic_cost;
					  chat_cost=obj.Chat_feature;
					  user_cost=obj.User_cost;
					  publish_cost=obj.feed_cost;
					  service_cost=obj.service_tax;
					  vat_cost=obj.vat;
					});
					  
				} else {
					alert("Invalid credentails. Please try again.");
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	
});

function enableOTPSales(textBox) {
	var salesCode = $("#sales_code").val().trim();
	
	if(salesCode.length == 0) {
		$("#send_sales_code_otp").prop("disabled", true);
		alert("Please enter Sales Code");
	} else {
		$("#send_sales_code_otp").prop("disabled", false);
	}
}


function sendSalesCodeOTP() {
	var salesCode = $("#sales_code").val().trim();
	var sales_Code = salesCode.substring(0, 6);
	sales_offer = salesCode.substring(6, salesCode.length);
	var url = appURL+ "/SalesPerson/GetSales_User?sales_code="+sales_Code;
	
	//$("#sales-code-otp-verify-div").show();
	//$("#sales-code-send-otp-div").hide();
	 $.ajax({
		url: url, 
		success: function(result){
			if(result.Status == "Success") {
				$("#sales-code-otp-verify-div").show();
				$("#sales-code-send-otp-div").hide();
				saleContact = result.Users.Person_contact;
				sendOTP_func(saleContact);
			} else {
				alert("Unauthorized Sales Code! Please try again.");
			}
		},
		error: function(e) {
			alert("Error occured! Please try again later");
			console.log(JSON.stringify(e));
		}
	}); 
}

function sendSalesOffer() {
	
	var url = appURL+ "/SalesPerson/GetSales_Offer?sales_code="+sales_offer;
	
	//$("#sales-code-otp-verify-div").show();
	//$("#sales-code-send-otp-div").hide();
	 $.ajax({
		url: url, 
		success: function(result){
			if(result.Status == "Success") {
				
				 offer_amount = 500;////result.Users.Person_contact;
				//sendOTP_func(saleContact);
			} else {
				 offer_amount = 0;
				//alert("Unauthorized Sales Code! Please try again.");
			}
		},
		error: function(e) {
			 offer_amount = 0;
			alert("Error occured! Please try again later");
			console.log(JSON.stringify(e));
		}
	}); 
}

function validateSalesCodeOTP() {
	var verifyOTPVal = $("#sales-code-verify-code").val().trim();
	if(verifyOTPVal.length == 6) {
		$("#sales-code-verify-btn").prop("disabled", false);
	} else {
		$("#sales-code-verify-btn").prop("disabled", true);
		$("#sales-code-verify-btn").css("color", "#FFF");
	}
}

function verifySalesCodeOTP() {
	var verifyOTPVal = $("#sales-code-verify-code").val().trim();
	$("#sales-code-verify-result-div").show();
	
	var url = appURL+ "/Registration/verifyCode?verificationCode="+verifyOTPVal+"&mobileNumber="+saleContact;
	console.log(url);
	
	
	 $.ajax({
		url: url, 
		success: function(result){
			console.log(JSON.stringify(result));
			if(result.status == "success") {
				$("#sales-code-verify-code-fail").show();
				$("#sales-code-verify-code-success").hide();
				payment_summary();
				$("#register-3-payment-summary-div").show();
				$("#register-4-div").hide();
				step1_validation = true;
			} else {
				$("#sales-code-verify-code-success").show();
				$("#sales-code-verify-code-fail").hide();
				step1_validation = true; // this should be false
				alert("Invalid verification Code. Please try again.");
			}
		},
		error: function(e) {
			alert("Error occured! Please try again later");
			console.log(JSON.stringify(e));
		}
	}); 
}


$( document ).ajaxStart(function(){
	var theme = $.mobile.loader.prototype.options.theme;
	var msgtext = "" || $.mobile.loader.prototype.options.text;
	var textVisible = false || $.mobile.loader.prototype.options.textVisible;
	var textOnly = !!false;
	var html = "";
	$.mobile.loading("show",{
		text:"wait",
		textVisible:textVisible,
		theme:theme,
		textonly:textOnly,
		html:html
	});
});

$( document ).ajaxComplete(function(){
	$.mobile.loading("hide");
});

$( document ).on( "pageinit", "#options", function() {
	console.log(userDetails);
	if(userDetails.UserType !== "admin") {
		$("#create-user-block").hide();
	}
});

$( document ).on( "pageinit", "#active-offers", function() {
	// populate market feed:
	var activeOffers = [
		{
			code_color: "coupoun-code-red",
			coupoun_code: "C00001",
			coupoun_name: "15% Discount",
			coupoun_description: "Get 15% Discount on items.",
			coupoun_duration: "3",
			coupoun_usage: "3rd October, 2015",
		},
		{
			code_color: "coupoun-code-orange",
			coupoun_code: "C00001",
			coupoun_name: "15% Discount",
			coupoun_description: "Get 15% Discount on items.",
			coupoun_duration: "3",
			coupoun_usage: "8th October, 2016",
		},
		{
			code_color: "coupoun-code-green",
			coupoun_code: "C00001",
			coupoun_name: "15% Discount",
			coupoun_description: "Get 15% Discount on items.",
			coupoun_duration: "3",
			coupoun_usage: "3rd October, 2015",
		},
		{
			code_color: "coupoun-code-yellow",
			coupoun_code: "C00001",
			coupoun_name: "15% Discount",
			coupoun_description: "Get 15% Discount on items.",
			coupoun_duration: "3",
			coupoun_usage: "3rd October, 2015",
		},
		{
			code_color: "coupoun-code-purple",
			coupoun_code: "C00001",
			coupoun_name: "15% Discount",
			coupoun_description: "Get 15% Discount on items.",
			coupoun_duration: "3",
			coupoun_usage: "3rd October, 2015",
		}
	];
	var activeOffersLength = activeOffers.length;
	var activeOffersDiv = $("#active-offers-div");
	
	for(var i=0;i<activeOffersLength;i++) {
		var offerContainer = $("<div/>").addClass("offer-container");
		
		var activeOfferTblHTML = activeOffersTbl.replace(templateKeys.activeOffers.code_color, activeOffers[i].code_color).replace(templateKeys.activeOffers.coupoun_code, activeOffers[i].coupoun_code).replace(templateKeys.activeOffers.coupoun_name, activeOffers[i].coupoun_name).replace(templateKeys.activeOffers.coupoun_description, activeOffers[i].coupoun_description).replace(templateKeys.activeOffers.coupoun_duration, activeOffers[i].coupoun_duration).replace(templateKeys.activeOffers.coupoun_usage, activeOffers[i].coupoun_usage);
		
		$(offerContainer).append(editActiveOfferDiv);
		$(offerContainer).append(activeOfferTblHTML);
		$(activeOffersDiv).append($(offerContainer));
	}
	
	$( ".market-feed-tbl" ).on( "swiperight", function( e ) {
		if($(this).parent().find("#right").is(":visible")){
			$(this).parent().find("#right").hide("slide", { direction: "right" }, 500);
			$(this).parent().find("#market-feed-tbl").animate({
				'marginLeft' : "0px" //moves left
			});
		} else {
			$(this).parent().find("#left").show("slide", { direction: "left" }, 500);
			$(this).parent().find("#market-feed-tbl").animate({
				'marginLeft' : "100px" //moves left
			});
		}
	});
	
	$( ".market-feed-tbl" ).on( "swipeleft", function( e ) {
		if($(this).parent().find("#left").is(":visible")){
			$(this).parent().find("#left").hide("slide", { direction: "left" }, 500);
			$(this).parent().find("#market-feed-tbl").animate({
				'marginLeft' : "0px" //moves left
			});
		} else {
			$(this).parent().find("#right").show("slide", { direction: "right" }, 500);
			$(this).parent().find("#market-feed-tbl").animate({
				'marginLeft' : "-100px" //moves left
			});
		}
	});
});

$( document ).on( "pageinit", "#active-offers", function() {
	$( ".active-offer-tbl" ).on( "swiperight", function( e ) {
		if($(this).parent().find("#right").is(":visible")){
			$(this).parent().find("#right").hide("slide", { direction: "right" }, 500);
			$(this).parent().find("#active-offer-tbl").animate({
				'marginLeft' : "0px" //moves left
			});
		} else {
			$(this).parent().find("#left").show("slide", { direction: "left" }, 500);
			$(this).parent().find("#active-offer-tbl").animate({
				'marginLeft' : "100px" //moves left
			});
		}
	});
	
	$( ".active-offer-tbl" ).on( "swipeleft", function( e ) {
		$(this).parent().find("#left").hide("slide", { direction: "left" }, 500);
		$(this).parent().find("#active-offer-tbl").animate({
			'marginLeft' : "0px" //moves left
		});
	});
});


$( document ).on( "pageinit", "#company-profile", function() {
	try{
		var company_profile = userDetails.Merchant_Profile[0];
		$("#cp_username").html(company_profile.Company_name);
		$("#cp_companydesc").html(company_profile.Company_Desc);
		$("#cp_companyadd").html(company_profile.Company_Add);
		$("#cp_companytel").html(company_profile.Company_Contact);
		$("#cp_companymail").html(company_profile.Company_Email);
		$("#cp_companyweb").html(company_profile.Website_URL);
		$("#cp_companyfb").html(company_profile.Facebook_URL);
		$("#cp_companytw").html(company_profile.Twitter_URL);
	}catch ( e ) {
                  alert("Error: " + e.description );
    }
});
$(document).on("pagecreate", "#register-screen-3", function () {
	function flipChanged(e) {
        var id = this.id, value = this.value;
		//alert($(this).parent().parent().parent().parent().html());
		$(this).parent().parent().parent().parent().find("#"+id+"-val").html(value);
		if(id==="flip-1" && value==="Yes"){
			//$("#profile_setup").html("Rs. "+profile_cost);
			Total_cost=+profile_cost;
			//alert(Total_cost);
		}else if(id==="flip-1" && value==="No"){
			//$("#profile_setup").html("Rs. 0");
			Total_cost=Total_cost-profile_cost;
		}
		
		if(id==="flip-2" && value==="Yes"){
			//$("#feed_cost").html("Rs. "+publish_cost);
			Total_cost=Total_cost+publish_cost;
		}else if(id==="flip-2" && value==="No"){
			//$("#feed_cost").html("Rs. 0");
			Total_cost=Total_cost-publish_cost;
		}
		
		if(id==="flip-3" && value==="Yes"){
			//$("#chat_cost").html("Rs. "+chat_cost);
			Total_cost=Total_cost+chat_cost;
		}else if(id==="flip-3" && value==="No"){
			//$("#chat_cost").html("Rs. 0");
			Total_cost=Total_cost-chat_cost;
		}
		//$("#invoice_value").html(Total_cost);
    }
	$("#flip-1").on("change", flipChanged);
	$("#flip-2").on("change", flipChanged);
	$("#flip-3").on("change", flipChanged);
	$('select').slider();
	
	$.mobile.switchPopup = function(sourceElement, destinationElement, onswitched) {
		var afterClose = function() {
			destinationElement.popup("open");
			sourceElement.off("popupafterclose", afterClose);

			if (onswitched && typeof onswitched === "function"){
				onswitched();
			}
		};

		sourceElement.on("popupafterclose", afterClose);
		sourceElement.popup("close");
	};
});

function enableOTP(textBox) {
	var id, value, _continue = [true, true, true];
	var username, email, contact_number;
	username = $("#username").val().trim();
	email = $("#email").val().trim();
	contact_number = $("#contact_number").val().trim();
	
	id = $(textBox).attr("id");
	value = $(textBox).val().trim();
	
	// validate username: 
	if(username.indexOf(" ") > 1) {
		_continue[0] = false;
	}else{
		_continue[0] = true;
	}

	// validate email
	_continue[1] = isValidEmailAddress(email);
	
	// validate contact number
	if(contact_number.length !== 10) {
		_continue[2] = false;
	}else{
		_continue[2] = true;
	}
		
	if(_continue[0] && _continue[1] && _continue[2]) {
		$("#send_otp").prop("disabled", false);
	} else {
		$("#send_otp").prop("disabled", true);
	}
}

function sendOTP() {
	//alert("i am here");
	var username = $("#username").val().trim();
	var email = $("#email").val().trim();
	var contact_number = $("#contact_number").val().trim();

	sendOTP_func(contact_number);
}

function sendOTP_func(contact_number){
	
	
	var url = appURL+ "/Registration/generateOTP?mobileNumber="+contact_number;
	
	//alert(url);
	$("#otp-verify-div").show();
	$("#send-otp-div").hide();
	$.ajax({
		url: url, 
		success: function(result){
			//alert(JSON.stringify(result));
			if(result.status == "success") {
				$("#otp-verify-div").show();
				$("#send-otp-div").hide();
			} else {
				alert("Unable to send OTP. Please try again.");
			}
		},
		error: function(e) {
			alert("Error occured! Please try again later");
			console.log(JSON.stringify(e));
		}
	});
	
}

function resendOTP() {
	sendOTP();
}

function validateOTP() {
	var verifyOTPVal = $("#verify-code").val().trim();
	if(verifyOTPVal.length == 6) {
		$("#verify-btn").prop("disabled", false);
	} else {
		$("#verify-btn").prop("disabled", true);
		$("#verify-btn").css("color", "#FFF");
	}
}

function verifyOTP() { // verifyCode
	var verifyOTPVal = $("#verify-code").val().trim();
	var contactNumber = $("#contact_number").val().trim();
	$("#verify-result-div").show();
	
	var url = appURL+ "/Registration/verifyCode?verificationCode="+verifyOTPVal+"&mobileNumber="+contactNumber;
	console.log(url);
	
	$("#verify-code-fail").show();
				$("#verify-code-success").hide();
				step1_validation = true;
	$.ajax({
		url: url, 
		success: function(result){
			console.log(result);
			if(result.status == "success") {
				$("#verify-code-fail").show();
				$("#verify-code-success").hide();
				step1_validation = true;
			} else {
				$("#verify-code-success").show();
				$("#verify-code-fail").hide();
				step1_validation = false; // this should be false
				alert("Invalid verification Code. Please try again.");
			}
		},
		error: function(e) {
			alert("Error occured! Please try again later");
			console.log(JSON.stringify(e));
		}
	});
}

function validate_step_1() {
	if(step1_validation) {
		var url = appURL+ "/Registration/Registration";
		console.log(url);
	var userProfile={
			Username:$("#username").val(),
			Email:$("#email").val(),
			Password:$("#verify-code").val(),
			MobileNo:$("#contact_number").val(),
			UserType:"admin",
			SuperAdmin:"0",
			OTP:$("#verify-code").val()
		};
		$.ajax({
			url: url,
			method: "POST",
			data:userProfile,
			success: function(result){
				//console.log(result);
				if(result.Status == "Success") {
					//alert("ttt.");
					step1_validation = true;
					$.mobile.changePage("#register-screen-2");
					//step1_validation = true;
					user_id = result.Users.UserID;
				} else {
					alert("Registration fail. Please try again.");
					$("#verify-code-success").show();
					$("#verify-code-fail").hide();
					//$.mobile.changePage("#login-screen"); // this should be commentde
				//step1_validation = true; // this should be false
					
				}
			},
			error: function(e) {
				alert(result.Message);
				$.mobile.changePage("#login-screen"); // this should be commentde
				//step1_validation = true; // this should be false
				
				//console.log(JSON.stringify(e));
			}
		});
		/* $.mobile.changePage("#register-screen-2"); */
	}
}

function validatCompanyEmail(){
	var company_email_address = $("#co-email").val().trim();
	if((company_email_address.length > 0) && (isValidEmailAddress(company_email_address) === false)) {
		alert("Invalid Email");
		$("#co-email").focus();
	}
}

function validate_step_2(){
	var company_name, company_address, company_contact_number, company_email_address, company_website, _continue = false;
	company_name = $("#company-name").val().trim();
	company_address = $("#company-address").val().trim();
	company_contact_number = ($("#co-contact-number").length>0) ? ($("#co-contact-number").val().trim()) : "";
	company_email_address = ($("#co-contact-number").length > 0) ? ($("#co-contact-number").val().trim()) : "";
	company_website = ($("#co-contact-number").length > 0) ? ($("#co-contact-number").val().trim()) : "";
	company_facebook_url = ($("#facebook-url").length > 0) ? ($("#facebook-url").val().trim()) : "";
	company_twitter_url = ($("#twitter-url").length > 0) ? ($("#facebook-url").val().trim()) : "";
	//user_id=30;//HJEDHQE^&^#%!#^
	var merchant_profile={
				"Company_name":company_name,
				"Company_Email":company_email_address,
				"Company_Contact":company_contact_number,
				"Company_Add":company_address,
				"Company_Desc":"",
				"Website_URL":company_website,
				"Facebook_URL":company_facebook_url ,
				"Twitter_URL":company_twitter_url,
				"Logo_URL":"",
				"UserId":user_id
		};
	console.log(JSON.stringify(merchant_profile));
	
	if( (company_name.length > 0 )){
		var url = appURL+"/Registration/setProfile";
		console.log(url);
		$.ajax({
			url: url,
			method: "POST",
			data:merchant_profile,
			dataType:'json',
			success: function(result){
				console.log(result);
				if(result.Status == "Success") {
					//alert("ttt.");
					step2_validation = true;
					$.mobile.changePage("#register-screen-3");
					//step1_validation = true;
				} else {
					alert(result.Message);
					//$.mobile.changePage("#register-screen-1"); // this should be commentde
					//step1_validation = true; // this should be false
					
				}
			},
			error: function(e) {
				alert("Error occured! Please try again later");
				//$.mobile.changePage("#register-screen-2"); // this should be commentde
				//step1_validation = true; // this should be false
				console.log(JSON.stringify(e));
			}
		});
	}
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function makePayment() {
	if ($(".ui-popup-active").length > 0) {
        $('#secure-pay-div').popup('close');
    } else {
        $('#secure-pay-div').popup('open');
    }
}

function selectPayment() {
	if ($(".ui-popup-active").length > 0) {
        $('#select-pay-div').popup('close');
    } else {
        $('#select-pay-div').popup('open');
    }
}

function addCoupoun() {
	history.back();
    setTimeout(function () {
        $("#add-coupoun-div").popup('open');
    }, 100);
}



function openCamera() {
	
	capturePhotoWithFile();
}


function performLogin() {
	var login_username, login_pwd;
	login_username = $("#login-username").val().trim();
	login_pwd = $("#login-password").val().trim();
	
	if(login_username.length === 0 || login_pwd.length === 0) {
		alert("Please enter username and password");
		$("#login-username").focus();
		return false;
	} else {
		console.log(appURL + "/Registration/GetMerchant_User?user_name="+login_username+"&pass="+login_pwd);
		$.ajax({
			url: appURL + "/Registration/GetMerchant_User?user_name="+login_username+"&pass="+login_pwd, 
			success: function(result){
				if(result.Status == "Success") {
					userDetails = result.Users;
					sessionStorage.setItem('resultUser', result.Users);
					$.mobile.changePage("#market-feed", "fade");
				} else {
					alert("Invalid credentails. Please try again.");
					userDetails = {};
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	}
	return false;
}

function makeAjaxCall(url) {
	var returnObj = {};
	$.ajax({
		url: url, 
		success: function(result){
			returnObj.state = "success";
			returnObj.message = result;
		},
		error: function(e) {
			returnObj.state = "failure";
			returnObj.message = result;
		}
	}).done(function(){
		alert("ajax has been completed.."+JSON.stringify(returnObj));
		return returnObj;
	});
}
function PaymentDetails(){
	alert("You are successfully register. Please login again with received OTP!");
	$.mobile.changePage('#login-screen', 'fade');
}
function addCoupoun() {
	var coupounCode = $("#add-coupoun-code").val().trim();
	var coupounTitle = $("#add-coupoun-title").val().trim();
	var coupounDesc = $("#add-coupoun-desc").val().trim();
	
	if(coupounCode.length == 0 || coupounTitle.length == 0 || coupounDesc.length == 0) {
		alert("Please provide all the values");
	} else {
		console.log(appURL + "/Registration/GetMerchant_User?user_name="+login_username+"&pass="+login_pwd);
		$.ajax({
			url: appURL + "/Registration/GetMerchant_User?user_name="+login_username+"&pass="+login_pwd, 
			success: function(result){
				if(result.Status == "Success") {
					alert("Coupoun added successfully.");
				} else {
					alert("Invalid credentails. Please try again.");
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	}
	
}

function addFeed() {
	var feedDesc = $("#add-feed-content").val(),
		feedTitle = $("#add-feed-title").val(),
		companyId = userDetails.Merchant_Profile[0].Company_id, // please confim
		userId = userDetails.UserID,
		feedStatus = 1;
	
	if(feedDesc.length == 0 || feedTitle.length === 0) {
		alert("Please enter Title and Description");
	} else {
		console.log(appURL1 + "/setMerchant_feed");
		var data = {
			Feed_desc: feedDesc,
			Feed_title: feedTitle,
			Company_id: companyId,
			User_id: userId,
			Feed_Status: feedStatus
		}
		console.log(data);
		$.ajax({
			url: appURL1 + "/setMerchant_feed", 
			data: data,
			success: function(result){
				if(result.status == "Success") {
					alert("Feed added successfully.");
				} else {
					alert("Invalid credentails. Please try again.");
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	}
	
}

function backMarketFeed() {
	$.mobile.changePage("#market-feed", "fade");
	location.reload();
}

function showNewFeed() {
	//$("#comp_logo").
	
	var largeImage = document.getElementById('comp_logo');
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = sessionStorage.getItem('imageData');
	 // movePic1(imageData);
	 // sessionStorage.setItem('imageData', imageURI);
	$.mobile.changePage("#add-feed", "fade");
	//add-feed
}
function showNewFeed1(logoid) {
	//$("#comp_logo").
	
	var largeImage = document.getElementById(logoid);
      // Unhide image elements
      //
      largeImage.style.display = 'block';
      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = sessionStorage.getItem('imageData');
	 // movePic1(imageData);
	 // sessionStorage.setItem('imageData', imageURI);
	//$.mobile.changePage("#add-feed", "fade");
	//add-feed
}

function addOffers() {
	$.mobile.changePage("#add-coupoun-screen", "fade");
}

function backCoupounScreen() {
	$.mobile.changePage("#active-offers", "fade");
}

function callmap(){
	$.mobile.changePage("#map_page", "fade");
	navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});

	//google.maps.event.addDomListener(window, 'load', onSuccess);
	
}
function displayMap(){
	$.mobile.changePage("#register-screen-2", "fade");		
}
function onSuccess(position) {
	var lat=position.coords.latitude;
	var lang=position.coords.longitude;
	//Google Maps
	var myLatlng = new google.maps.LatLng(lat,lang);
	var mapOptions = {zoom: 8,center: myLatlng}
	var map = new google.maps.Map(document.getElementById('map_div'), mapOptions);
	var marker = new google.maps.Marker({position: myLatlng,map: map});
	
	// reverse geocode
	ReverseGeocode(lat,lang);
}
function onError(error) {
	alert('Please enabled your Location service!');
	//navigator.
}


function setPaymentType(idx) {
	paymentMethod = idx;
}

function showSecurePay() {
	if(paymentMethod == "0") {
		alert('You are now member of Mirari! Please Login to continue.');
		$.mobile.changePage('#login-screen', 'fade');
	} else {
		history.back();
		setTimeout(function () {
			$("#secure-pay-div").popup('open');
		}, 100);
	}
}

function ReverseGeocode(latitude, longitude){
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(latitude, longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
 
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                   // alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
						$("#company-address").val(results[0].formatted_address);
                    }
            else {
                    alert('Unable to detect your address.');
                    }
        } else {
            alert('Unable to detect your address.');
        }
    });
}

function showComments(a_link,feedid) {
	//alert(feedid);
	activeFeed = feedid;
	var img_src = $(a_link).closest("tr").prev().find("img").attr("src");
	var passwordDetails={
		feed_id:feedid
	};
	$.ajax({
			url: appURL1 + "/getfeeds_comments",  
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(passwordDetails),
			success: function(result){
				if(result.status == "Success") {
					var marketFeeds = result.lst;
					// var marketFeeds = [[1, "test", "this is a comment"]];
					var marketFeedsLength = marketFeeds.length;
					var marketFeedDiv = $("#market-feed-comments-div");
					
					for(var i=0;i<marketFeedsLength;i++) {
						marketFeedDiv.append('<div class="feed-comment-container"><table class="market-feed-comment-tbl" id="market-feed-tbl"><tr><td class="market-feed-img-container"><img class="market-feed-company-icon" src="images/default-logo.png"></td><td class="market-feed-td"><div class="market-feed-company-name">'+userDetails.Username+'</div><div id="market-feed-company-desc" class="market-feed-company-desc">'+ marketFeeds[i][1]+'</div><div style="margin-top: 5px;"><input type="text" style="display:none;width: 70%;font-size: 12px;padding: 3px;" id="edit-comment-desc" class="custom-input white" value="'+marketFeeds[i][1]+'" data-role="none"></div></td><td style="width:10%;"><a id="edit-comment-edit-btn" href="#" onclick="editComment(\''+marketFeeds[i][0]+'\')"><i class="fa fa-pencil" style="color:black;" aria-hidden="true"></i></a></td><td style="width:10%;"><a style="display:none;" id="edit-comment-save-btn" href="#" onclick="saveEditComment(\''+marketFeeds[i][0]+'\')"><i class="fa fa-check-circle" style="color:black;" aria-hidden="true"></i></a><a href="#" id="edit-comment-delete-btn" onclick="deleteComment(\''+marketFeeds[i][0]+'\')"><i class="fa fa-eraser" style="color:black;" aria-hidden="true"></i></a></td></tr></table></div>');
					}
					$.mobile.changePage('#market-feed-comments', 'fade');
						
						$("#market-feed-comment-company-icon").attr("src", img_src);
						$("#market-feed-comment-company-name").html($(a_link).closest("tr").prev().find(".market-feed-company-name").eq(0).html());
						$("#market-feed-comment-company-desc").html($(a_link).closest("tr").prev().find(".market-feed-company-desc").eq(0).html());
				} else {
					alert(result.message);
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		}); 
	
	
}

function editComment(commentid) {
	$("#edit-comment-desc").show();
	$("#edit-comment-save-btn").show();
	$("#edit-comment-edit-btn").hide();
	$("#edit-comment-delete-btn").hide();
	$("#market-feed-company-desc").hide();
}

function deleteComment(commentid) {
	var userid = userDetails.UserID;
	var r = confirm("Are you sure you want to delete the comment?");
	if (r == true) {
		var data = {
			user_id: userid,
			comment_id: commentid
		}
		// alert("Ajax call made " + JSON.stringify(data));
		$.ajax({
			url: appURL1 + "/delFeed_Comment",  
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data),
			success: function(result){
				if(result.status == "Success") {
					alert("Comment saved successfully.");
				} else {
					alert("Error saving comment");
				}
			}
		});
		$("#edit-comment-desc").hide();
		$("#edit-comment-save-btn").hide();
		$("#edit-comment-edit-btn").show();
		$("#edit-comment-delete-btn").show();
		$("#market-feed-company-desc").show();
	}
}

function saveEditComment(commentid){
	var comment_desc = $("#edit-comment-desc").val().trim();
	if(comment_desc.length === 0) {
		alert("Please Enter the comment to edit");
	} else {
		var data = {
			comment_desc: comment_desc,
			comment_id: commentid
		}
		// alert("Ajax call made " + JSON.stringify(data));
		$.ajax({
			url: appURL1 + "/editFeed_Comment",  
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data),
			success: function(result){
				if(result.status == "Success") {
					alert("Comment saved successfully.");
				} else {
					alert("Error saving comment");
				}
			}
		});
		$("#edit-comment-desc").hide();
		$("#edit-comment-save-btn").hide();
		$("#edit-comment-edit-btn").show();
		$("#edit-comment-delete-btn").show();
		$("#market-feed-company-desc").show();
	}
}


function addComment() {
	var comment = $("#add-feed-comment").val().trim();
	var comp_id;
	if(comment.length === 0) {
		alert("Please enter the comment");
	} else {
		
		//alert(JSON.stringify(userDetails.Merchant_Profile.Company_id));
		  try {
                  comp_id=userDetails.Merchant_Profile[0].Company_id;
               } 
               
               catch ( e ) {
                  comp_id=1;
               }
			var passwordDetails = {
				company_id : comp_id,
				feed_id: activeFeed,
				user_id: userDetails.UserID,
				comment_desc:comment
			};
		//alert( JSON.stringify(passwordDetails));
		$.ajax({
			url: appURL1 + "/setFeed_Comment",  
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(passwordDetails),
			success: function(result){
				if(result.status == "Success") {
					//alert("Success");  
					//market-feed-comments
					$.mobile.changePage("#market-feed-comments", "fade");
				} else {
					alert(result.message);
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		}); 
	}
}

function editCompanyProfile() {
	$.ajax({
		url: appURL + "/Registration/getFeatureCost", 
		success: function(result){
			if(result.Status == "Success") {
				alert("Success");  
			} else {
				alert("Invalid credentails. Please try again.");
			}
		},
		error: function(e) {
			alert(JSON.stringify(e));
		}
	});
	alert("Send Edit API");
}
function createUser() {
	var username = $("#user-username").val().trim();
	var userEmail = $("#user-email").val().trim();
	var userMobile = $("#user-mobile").val().trim();
	var userPassword = $("#user-password").val().trim();
	alert(username);
	alert(userEmail);
	alert(userMobile);
	if((username.length === 0) || (userEmail.length === 0) || (userMobile.length === 0) || (userPassword.length === 0) ) {
		alert("Please provide all the values");
	} else {
		var data = {
			Username: username,
			Password: userPassword,
			Email: userEmail,
			MobileNo: userMobile,
			UserType: "merchant",
			SuperAdmin: userDetails.UserID
		}
		$.ajax({
			url: appURL1 + "/addMerchantUser", 
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data),
			success: function(result){
				if(result.status == "Success") {
					alert("Success");  
				} else {
					alert("Invalid credentails. Please try again.");
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	}
}
function changePassword() {
	var currPassword = $("#current-password").val();
	var newPassword = $("#new-password").val();
	var confirmNewPassword = $("#confirm-password").val();
	alert(userDetails.Password);
	if((currPassword.length === 0) || (newPassword.length === 0) || (confirmNewPassword.length === 0)) {
		alert("Please provide all the values");
	} else if(newPassword.trim() !== confirmNewPassword.trim()) {
		alert("The password and new password should be identical");
	} else if(currPassword.trim() !== userDetails.Password) {
		alert("Invalid current password");
	} else {
		var passwordDetails = {
			upass:currPassword,
			cpass:newPassword,
			user_id:userDetails.UserID
		}
		 $.ajax({
			url: appURL1 + "/changePassword",
			type : 'POST',
			crossDomain: true,
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(passwordDetails),			
			success: function(result){
				if(result.status == "Success") {
					alert("Success");  
				} else {
					alert(result.message);
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		}); 
	}
}
function addImageCompanyProfile() {
	alert("Add Image ");
}
function editFeed(a_link) {
	var table = $(a_link).closest(".feed-container").eq(0).find("table");
	var companyName = $(table).find(".market-feed-company-name").eq(0).html();
	var companyDesc = $(table).find(".market-feed-company-desc").eq(0).html();
	var companyIconSrc = $(table).find(".market-feed-company-icon").eq(0).attr("src");
	
	$.mobile.changePage("#add-feed", "fade");
	$("#comp_logo").attr("src", companyIconSrc);
	$("#add-feed-company-name").html(companyName);
	$("#add-feed-content").html(companyDesc);
}
function deleteFeed(feedId) {
	var r = confirm("Are you sure you want to delete the feed?");
	if (r == true) {
		var data = {
			"Feed_id": feedId
		}
		console.log(data);
		console.log(appURL1 + "/delMerchant_feed");
		$.ajax({
			url: appURL1 + "/delMerchant_feed", 
			data: data,
			success: function(result){
				if(result.status == "Success") {
					alert("Deleted Successfully");  
				} else {
					alert("Could not delete feed. Please try again.");
				}
			},
			error: function(e) {
				alert(JSON.stringify(e));
			}
		});
	} 
}

$(document).on("pageshow","#user-screen",function(){
	// uncomment this for testing
	var data = {
		user_id : userDetails.UserID,
	};
	
	/* var resultData = [
		[1, "admin1"],
		[2, "admin2"]
	]
	var resultDataLength = resultData.length; */
	
	// uncomment this for testing
	$("#user-tbl-body").html("");
	/* for(var i = 0; i < resultDataLength; i++) {
		var trHTML = '<tr><td class="company-profile-value" style="width: 83%;text-align: left;"><input type="hidden" id="user-'+i+'-id" value="1">Admin1</td><td><select name="user-flip-'+i+'" id="user-flip-'+i+'" onchange="toggleUserActivate(this)" data-role="flipswitch"><option value="No"></option><option value="Yes"></option></select></td></tr>';
		
		$("#user-tbl-body").append(trHTML);
		$("select").flipswitch();
	} */
	
	// comment this for testing
	$.ajax({
		url: appURL1 + "/MerchantUserList",  // to be changed
		data: data,
		success: function(result){
			var userList = result.lst;
			if(result.status == "Success") {
				for(var i = 0; i < userList.length; i++) {
					var trHTML = '<tr><td class="company-profile-value" style="width: 83%;text-align: left;"><input type="hidden" id="user-'+i+'-id" value="'+userList[i][1]+'">'+userList[i][0]+'</td><td><select name="user-flip-'+i+'" id="user-flip-'+i+'" onchange="toggleUserActivate(this)" data-role="flipswitch"><option value="No"></option><option value="Yes"></option></select></td></tr>';
					
					$("#user-tbl-body").append(trHTML);
					$("select").flipswitch();
				}
			} else {
				alert("Could not delete feed. Please try again.");
			}
		},
		error: function(e) {
			alert(JSON.stringify(e));
		}
	});
	
});

function toggleUserActivate(toggleSwitch) {
	var value = $(toggleSwitch).val();
	var data = {
		id: value
	}
	
	$.ajax({
		url: appURL1 + "/deleteMerchantUser",  // to be changed
		data: data,
		success: function(result){
			if(result.status == "Success") {
				alert("User Deactivated successfully");
			} else {
				alert("Could not delete feed. Please try again.");
			}
		},
		error: function(e) {
			alert(JSON.stringify(e));
		}
	});
}