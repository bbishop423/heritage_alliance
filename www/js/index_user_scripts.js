/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #aboutus-btn */
    $(document).on("click", "#aboutus-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#aboutuspage"); 
    });
    
        /* button  #museums-btn */
    $(document).on("click", "#museums-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#museumspage"); 
    });
    
        /* button  #exhibits-btn */
    $(document).on("click", "#exhibits-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#exhibitspage"); 
    });
    
        /* button  #calendar-btn */
    $(document).on("click", "#calendar-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#calendarpage"); 
    });
    
        /* button  #contact-btn */
    $(document).on("click", "#contact-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#contactpage"); 
    });
    
        /* button  #menu-btn */
    
    
        /* button  #closemenu-btn */
    $(document).on("click", "#closemenu-btn", function(evt)
    {
         /*global uib_sb */
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        
         uib_sb.toggle_sidebar($("#sidebar"));  
    });
    
        /* button  #menu-aboutus */
    $(document).on("click", "#menu-aboutus", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#aboutuspage"); 
    });
    
        /* button  #menu-museums */
    $(document).on("click", "#menu-museums", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#museumspage"); 
    });
    
        /* button  #menu-exhibits */
    $(document).on("click", "#menu-exhibits", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#exhibitspage"); 
    });
    
        /* button  #menu-calendar */
    $(document).on("click", "#menu-calendar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#calendarpage"); 
    });
    
        /* button  #menu-contact */
    $(document).on("click", "#menu-contact", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#contactpage"); 
    });
    
        /* button  #home-btn */
    
    
        /* button  #home-btn */
    $(document).on("click", "#home-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_98_19"); 
    });
    
        /* button  #menu-btn */
    $(document).on("click", "#menu-btn", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_98_19"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
