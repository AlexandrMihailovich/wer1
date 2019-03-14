//import "'./js/rainbows.js';
//import "'./js/unicorns.js';
import './scss/base.scss';

import './js/jquery.simplegallery/css/jquery.gallery.css';
import './js/jquery.simplegallery/js/jquery.gallery';


import "bootstrap-sass/assets/javascripts/bootstrap/transition.js";
import "bootstrap-sass/assets/javascripts/bootstrap/modal.js";
import "bootstrap-sass/assets/javascripts/bootstrap/dropdown.js";
import "bootstrap-sass/assets/javascripts/bootstrap/button.js";
import "bootstrap-sass/assets/javascripts/bootstrap/tooltip.js";
import "bootstrap-sass/assets/javascripts/bootstrap/collapse.js";
import "bootstrap-sass/assets/javascripts/bootstrap/affix.js";
import "bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js";

$(function() {
    // Fixed header
        //-----------------------------------------------
        $(window).scroll(function() {
            if (($(".header-nav").length > 0)) {
                if(($(this).scrollTop() > 0)/* && ($(window).width() > 767)*/) {
                    $(".header-nav").addClass("navbar-fixed-top-set");
                } else {
                    $(".header-nav").removeClass("navbar-fixed-top-set");
                }
            };
        });

        if (($(".header-nav").length > 0)) {
            if(($(this).scrollTop() > 0)/* && ($(window).width() > 767)*/) {
                $(".header-nav").addClass("navbar-fixed-top-set");
            } else {
                $(".header-nav").removeClass("navbar-fixed-top-set");
            }
        };


        //Scroll Spy
        //-----------------------------------------------
        if($(".scrollspy").length>0) {
            $("body").addClass("scroll-spy");
            $('body').scrollspy({
                target: '.scrollspy',
                offset: 152
            });
        }

        //Smooth Scroll
        //-----------------------------------------------
        if ($(".smooth-scroll").length>0) {
            $('.smooth-scroll a[href*="#"]:not([href="#"]), a[href*="#"]:not([href="#"]).smooth-scroll').click(function() {
                if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top-40
                    }, 1000);
                    return false;
                }
                }
            });
        }


        // google map ----------
        $('#open-map').click(function () {
            $('#gmap-modal').modal();
            return false;
        });
        $("#gmap-modal").on("shown.bs.modal", function () {
            google.maps.event.trigger(map, "resize");
        });
        ////////////////

        // gallery--------------------
        $('.simple_img_gallery').createSimpleImgGallery();
        ///////////////////////



        $(".contact__row").submit(function(e) {

            function validation() {
                var message = '';

                var success = false;

                var el_l    = $("#InputPassword");
                if ( el_l.val().length < 4 ) {
                    success = true;
                    message += 'Name < 3.<br>'
                    $("#InputPassword").parent('div').addClass('has-error');
                } else {
                    $("#InputPassword").parent().removeClass('has-error');
                }


                var reg     = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
                var el_e    = $("#InputEmail");
                var v_email = el_e.val() ? false : true;

                if ( v_email ) {
                    success = true;
                    message += 'Email == false. <br>'
                    $("#inputEmail").parent('div').addClass('has-error');
                } else if ( !reg.test( el_e.val() ) ) {
                    success = true;
                    message += 'Email not correct. <br>'
                    $("#inputEmail").parent('div').addClass('has-error');
                } else {
                    $("#inputEmail").parent().removeClass('has-error');
                }



                $('#error-modal .modal-body').html(message);

                return success;
            }

            if (validation()) {
                //$('#error-modal').modal();
                return false;
            }


            var url = "send.php"; // the script where you handle the form input.

            $.ajax({
                type: "POST",
                url: url,
                data: $(".contact__row").serialize(), // serializes the form's elements.
                success: function(data)
                {
                    //$('#my-modal .modal-body').html(data);
                    $('#send-form-success').modal();
                },
                error:  function(xhr, str){
                    alert('error: ' + xhr.responseCode);
                }
            });

            e.preventDefault(); // avoid to execute the actual submit of the form.
        });

});