/* 
	jQuery Mobile Boilerplate
	application.js
*/
var appURL = "http://www.qikkle.com/Mirari/api";
var step1_validation = false;
var step2_validation = false;
var step3_validation = false;
var userDetails = {}
var editMarketFeedDiv = '<div id="left" class="edit-market-feed-container"><div class="edit-block-container"><div><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div><div class="edit-block-text">Edit Feed</div></div></div>';
var deleteMarketFeedDiv = '<div class="cancel-market-feed-container" id="right"><div class="cancel-block-container"><div><i class="fa fa-times" aria-hidden="true"></i></div><div class="cancel-block-text">Delete Feed</div></div></div>';
var marketFeedTbl = '<table class="market-feed-tbl" id="market-feed-tbl"><tr><td class="market-feed-img-container"><img class="market-feed-company-icon" src="_#_COMPANY_LOGO_#_"></td><td class="market-feed-td"><div class="market-feed-company-name">_#_COMPANY_NAME_#_</div><div class="market-feed-company-desc">_#_DESCRIPTION_#_</div></td><td class="market-feed-td"><span class="market-feed-time">_#_TIME_#_</span></td></tr><tr><td colspan="3"><span class="market-feeds-like"><i class="fa fa-heart" style="color:red;" aria-hidden="true"></i><span class="market-feed-likes-count">_#_LIKES_#_ Likes</span> </span> <span class="market-feeds-like"><i class="fa fa-comments" style="color:green;" aria-hidden="true"></i><span class="market-feed-comments-count">_#_COMMENTS_#_ Comments</span></span></td></tr></table>';

var editActiveOfferDiv = '<div id="left" class="edit-active-offers-container"><div class="renew-block-container"><div><i class="fa fa-refresh" aria-hidden="true"></i></div><div class="renew-block-text">Renew</div></div></div>';
var activeOffersTbl = '<table class="active-offer-tbl" id="active-offer-tbl"><tr><td class="active-offer-img-container"><div class="_#_CODE_COLOR_#_">_#_COUPOUN_CODE_#_</div></td><td class="active-offer-td"><div class="active-offer-company-name">_#_COUPOUN_NAME_#_</div><div class="active-offer-company-desc">_#_COUPOUN_DESCRIPTION_#_</div></td></tr><tr><td colspan="2"><span class="active-offers-usage"><i class="fa fa-bar-chart" style="color:#51A7F9;" aria-hidden="true"></i><span class="active-offers-usage-count">_#_COUPOUN_USAGE_#_ Used This</span> </span> <span class="active-offers-duration"><i class="fa fa-times" style="color:#EC5D57;" aria-hidden="true"></i><span class="active-offers-duration-count">_#_COUPOUN_DURATION_#_</span></span></td></tr></table>';




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
	}, 3000);
});

$( document ).on( "pageinit", "#market-feed", function() {
	// populate market feed:
	var marketFeeds = [
		{
			logo: "images/default-logo.png",
			companyName: "Richa Name",
			companyDesc: "Company Description",
			time: "Unlimited",
			likes: "24",
			comments: "34",
		},
		{
			logo: "images/default-logo.png",
			companyName: "Joshi Name",
			companyDesc: "Company Description",
			time: "24 Days",
			likes: "24",
			comments: "34",
		}
	];
	var marketFeedsLength = marketFeeds.length;
	var marketFeedDiv = $("#market-feed-div");
	
	for(var i=0;i<marketFeedsLength;i++) {
		var feedContainer = $("<div/>").addClass("feed-container");
		
		var marketFeedTblHTML = marketFeedTbl.replace(templateKeys.marketFeed.companyName, marketFeeds[i].companyName).replace(templateKeys.marketFeed.companyDesc, marketFeeds[i].companyDesc).replace(templateKeys.marketFeed.time, marketFeeds[i].time).replace(templateKeys.marketFeed.likes, marketFeeds[i].likes).replace(templateKeys.marketFeed.comments, marketFeeds[i].comments).replace(templateKeys.marketFeed.logo, marketFeeds[i].logo);
		
		$(feedContainer).append(editMarketFeedDiv);
		$(feedContainer).append(marketFeedTblHTML);
		$(feedContainer).append(deleteMarketFeedDiv);
		$(marketFeedDiv).append($(feedContainer));
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


$(document).on("pagecreate", "#register-screen-3", function () {
	function flipChanged(e) {
        var id = this.id, value = this.value;
		alert($(this).parent().parent().parent().parent().html());
		$(this).parent().parent().parent().parent().find("#"+id+"-val").html(value);
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
	var username = $("#username").val().trim();
	var email = $("#email").val().trim();
	var contact_number = $("#contact_number").val().trim();

	var url = appURL+ "/Registration/generateOTP?mobileNumber="+contact_number;
	
	$.ajax({
		url: url, 
		success: function(result){
			if(result.Status == "Success") {
				$("#otp-verify-div").show();
				$("#send-otp-div").hide();
			} else {
				$("#otp-verify-div").show();
				$("#send-otp-div").hide();
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
	alert("resendOTP called.");
}

function validateOTP() {
	var verifyOTPVal = $("#verify-code").val().trim();
	if(verifyOTPVal.length == 4) {
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
	
	$.ajax({
		url: url, 
		success: function(result){
			console.log(result);
			if(result.Status == "Success") {
				$("#verify-code-fail").show();
				$("#verify-code-success").hide();
				step1_validation = true;
			} else {
				$("#verify-code-success").show();
				$("#verify-code-fail").hide();
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

function validate_step_1() {
	if(step1_validation) {
		$.mobile.changePage("#register-screen-2");
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
	company_contact_number = ($("#co-contact-number").length>0) ? ($("#co-contact-number").val().trim()) : ("");
	company_email_address = ($("#co-contact-number").length > 0) ? ($("#co-contact-number")) : ("");
	company_website = ($("#co-contact-number").length > 0) ? ($("#co-contact-number")) : ("'");
	company_facebook_url = ($("#facebook-url").length > 0) ? ($("#facebook-url").val().trim()) : ("");
	company_twitter_url = ($("#twitter-url").length > 0) ? ($("#facebook-url").val().trim()) : ("");
	
	if( (company_name.length > 0 ) && (company_address.length > 0)){
		var url = appURL+ "/Registration/setProfile?UserId="+userDetails.UserId+"&Chat_feature="+userDetails.Chat_feature+"&User_limit="+userDetails.User_limit+"&Expiry_date="+userDetails.Expiry_date+"&merchant_feed="+userDetails.merchant_feed+"&Profile_feature="+userDetails.Profile_feature;
		console.log(url);
		$.ajax({
			url: url,
			method: "POST",
			success: function(result){
				console.log(result);
				if(result.Status == "Success") {
					alert("ttt.");
					step2_validation = true;
					$.mobile.changePage("#register-screen-3");
					step1_validation = true;
				} else {
					alert("Invalid verification Code. Please try again.");
					$("#verify-code-success").show();
					$("#verify-code-fail").hide();
					$.mobile.changePage("#register-screen-3"); // this should be commentde
					step1_validation = true; // this should be false
					
				}
			},
			error: function(e) {
				alert("Error occured! Please try again later");
				$.mobile.changePage("#register-screen-3"); // this should be commentde
				step1_validation = true; // this should be false
				
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

function addCoupoun() {
	history.back();
    setTimeout(function () {
        $("#add-coupoun-div").popup('open');
    }, 100);
}
function openCamera() {
	alert("TODO: open camera;");
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
					console.log(userDetails);
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

function addCoupoun() {
	var coupounCode = $("#add-coupoun-code");
	var coupounTitle = $("#add-coupoun-title");
	var coupounDesc = $("#add-coupoun-desc");
	
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