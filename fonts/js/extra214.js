/**
 * Extra JS 
 */

$(function()
{

	$(document).ready(function () {
		
		
		
		setTimeOfDayBgImage();   	
    		
    			
		$('[data-toggle="popover"]').popover();
		
		$(".pop").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
	});
		
		$(document).ready(function(){
		
		
		  var elem = document.getElementById('messages-list');
		  if (!elem == null) {
			  elem.scrollTop = elem.scrollHeight;
			} 
		  
    	
    	

    	
    	
    	});
		
		
			
		
		
		$('[data-toggle="tooltip"]').tooltip();
		
		/** Disable form submit, but load stripe when creditcard is selected */
		
		/*
		$('#creditcard_continue').hide();		
		$('input[name="pay_method"]').change(function() {
			if(document.getElementById('creditcard_select').checked) {
				$('#payment_continue').hide();
				$('#creditcard_continue').show();
			}else{
			 	$('#payment_continue').show();
				$('#creditcard_continue').hide();
			}
			

		});		
		*/
			
		$('input[name="account_type"]').change(function() {
		    var isBusinessAccount = $('input:checked[name="account_type"]').val() == "business";

		    	$('.business_input').toggleClass("hide");
		   
		});
		/**
		$('#upload-form').submit(function() {
			$('#description').html($('#editor').html());
			$('#description').val($('#editor').html());
		});
		*/
		$('.lightbox').lightbox();	

		

		
				
		$('.dropdown-menu input').click(function() {return false;})
		    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});
		
		
		/** Withdraw page option toggles */
				
		$('input[name="service"]').change(function() {
		    var isPaypal = $('input:checked[name="service"]').val() == "paypal";
		    $('#paypal_options').toggleClass("hide");
		    $('#swift_options').toggleClass("hide");
		});
		

		// click on notification icon loads notificationlist
		$(document).on("click", '#notification-dropdown', function(event) {	
			getNotifications();
			return false;
		});



		// click on like button toggle
		$(document).on("click", '.like-button', function(event) {	
			var itemId = $(this).data("item");
			var returnFormat = $(this).data("returnformat");
			likeItem(itemId,returnFormat);
			return false;
		});
		
		
		// click on bookmark button toggle
		$(document).on("click", '.bookmark-button', function(event) {	
		//$('.bookmark-button').click(function(){
			
			var itemId = $(this).data("item");
			var collectionId = $(this).data("collection");
			bookmarkItem(itemId,collectionId);
			return false;
		});
		
		
		// Submit Add collection form
		$(document).on('submit', '#addCollectionForm', function(e) {
			e.preventDefault(); // Prevent Default Submission

			var addCollectionName = $("#addCollectionName").val();
			var addCollectionPublic = $('#addCollectionPublic').is(":checked");
			var addCollctionItemId = $("#addCollectionItemId").val();
			
			
			
	         if (addCollectionName.length <= 2) {
	            console.log(addCollectionName.length);
	            $('#addCollectionNameGroup').addClass("has-error");
	         } else if (addCollectionName.length > 2) {
	            $('#addCollectionNameGroup').removeClass("has-error");
	            $('#addCollectionName').val("");
				$('#addCollectionPublic').attr('checked', false);
				addCollection(addCollectionName, addCollectionPublic, addCollctionItemId);	             
	         }
			
			return false;
		});

		// Remove content from addcollection modal on close.
        $('body').on('hidden.bs.modal', '.modal', function () {
        	$(this).removeData('bs.modal');
        });
        
        
        // Submit Add Message form
		$(document).on('submit', '#addMessageForm', function(e) {
			e.preventDefault(); // Prevent Default Submission

			var addMessageText = $("#addMessageText").val();
			var addMessageRecipientId = $("#addMessageRecipientId").val();			
			
			
	         if (addMessageText.length <= 0) {
	            console.log(addMessageText.length);
	            $('#addMessageText').addClass("has-error");
	         } else if (addMessageText.length > 0) {
	            $('#addMessageText').removeClass("has-error");
	            $('#addMessageText').val("");
				addMessage(addMessageText, addMessageRecipientId);	             
	         }
			
			return false;
		});
        
        
        // click on agree cookie button
		$(document).on("click", '#cookie-agree-button', function(event) {	
			cookieAgree();
			return false;
		});
        
        
        
        
		
				
	});	
});



	// Get notifications function
	// format: return format of HTML snippet, for example "button-normal"
	function getNotifications() {
		
		$.ajax({
		  type: 'POST',
		  url: '/notifications//ajax/',
		  data: { action: 'list'},
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		    // successful request; do something with the data
		    //$('#collection-status-' + collectionId).empty();
		    $('#headerbar-notifications').html(data);
		    //$(data).find('item').each(function(i){
		    //  $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
		    //});
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}




	// Add like call function
	// format: return format of HTML snippet, for example "button-normal"
	function likeItem(itemId,returnFormat) {
		
		$.ajax({
		  type: 'POST',
		  url: '/items/ajax/',
		  data: { action: 'like', itemId: itemId, returnFormat: returnFormat},
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		    // successful request; do something with the data
		    //$('#collection-status-' + collectionId).empty();
		    $('#like-button-holder-' + itemId).html(data);
		    //$(data).find('item').each(function(i){
		    //  $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
		    //});
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}





	// Add Bookmark call function
	function bookmarkItem(itemId,collectionId) {
		
		$.ajax({
		  type: 'POST',
		  url: '/collections/ajax/',
		  data: { action: 'bookmark', itemId: itemId, collectionId: collectionId },
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		    // successful request; do something with the data
		    //$('#collection-status-' + collectionId).empty();
		    $('#collection-status-' + collectionId).html(data);
		    //$(data).find('item').each(function(i){
		    //  $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
		    //});
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}









	// Add Collection post form
	function addCollection(addCollectionName, addCollectionPublic, addCollectionItemId) {
		
		$.ajax({
		  type: 'POST',
		  url: '/collections/ajax/',
		  data: { action: 'addCollection', name: addCollectionName, publically_visible: addCollectionPublic, itemId: addCollectionItemId },
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		    // successful request; do something with the data
		    //$('#collection-status-' + collectionId).empty();
		    $('#collectionList').prepend(data);
		    //$(data).find('item').each(function(i){
		    //  $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
		    //});
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}

	// Add Message post form
	function addMessage(addMessageText, addMessageRecipientId) {
		
		$.ajax({
		  type: 'POST',
		  url: '/messages/ajax/',
		  data: { action: 'addMessage', messageText: addMessageText, recipientId: addMessageRecipientId },
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		    // successful request; do something with the data
		    //$('#collection-status-' + collectionId).empty();
		    $('#messages-list-container').append(data);
		    var elem = document.getElementById('messages-list');
			elem.scrollTop = elem.scrollHeight;
		    //$(data).find('item').each(function(i){
		    //  $('#ajax-panel').append('<h4>' + $(this).find('title').text() + '</h4><p>' + $(this).find('link').text() + '</p>');
		    //});
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}

	// 
	// Call the cookie agree function
	function cookieAgree() {	
		$.ajax({
		  type: 'POST',
		  url: '/users/ajax/',
		  data: {action: 'cookieAgree'},
		  beforeSend:function(){
		    // this is where we append a loading image
		    //$('#ajax-panel').html('<div class="loading"><img src="/images/loading.gif" alt="Loading..." /></div>');
		  },
		  success:function(data){
		  	$('#cookieModal').modal('toggle');
		  },
		  error:function(){
		    // failed request; give feedback to user
		    //$('#collection-status-' + collectionId).html('<p class="error"><strong>Oops!</strong> Try that again in a few moments.</p>');
		  }
		});
	}






	function setTimeOfDayBgImage(){
		  var d = new Date();
	      var n = d.getHours();
	      if (n < 6){
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-night.jpg')");
	      }
	      else if (n > 5 && n < 10){
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-sunrise.jpg')");  
	      }
	      else if (n > 9 && n < 12){
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-morning.jpg')");
	      }
	      else if (n > 11 && n < 15){
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-noon.jpg')");  
	      }
	      else if (n > 14 && n < 18){
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-afternoon.jpg')");
     
	      }	        
	      else {
	        $(".frontpage-header").css("background", "url('/static/img/backgrounds/frontpage-bg-sunset.jpg')");
	      }
	      
	      $(".frontpage-header").css("background-size", "cover");
	      $(".frontpage-header").css("background-repeat", "no-repeat");
	      $(".frontpage-header").css("background-position", "50% 50%");
	      $(".frontpage-header").css("position", "relative"); 
	      
	}
		  



		

