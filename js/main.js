var transparent = true;

$(document).ready(function(){
    if($('.navbar[color-on-scroll]').length != 0){
        $(window).on('scroll', checkScrollForTransparentNavbar);
    }

    $('.navbar-toggler').on('click', function(){
        var $toggle = $(this);
        
        if($('html').hasClass('nav-open')){
            $('html').removeClass('nav-open');
            setTimeout(function(){
                $toggle.removeClass('toggled');
            }, 550);
        } else {
            setTimeout(function(){
                $toggle.addClass('toggled');
            }, 580);
            
            $('html').addClass('nav-open');
        }
    });
});

function checkScrollForTransparentNavbar() {
    if($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
        if(transparent) {
            transparent = false;
            $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
        }
    } else {
        if(!transparent) {
            transparent = true;
            $('.navbar[color-on-scroll]').addClass('navbar-transparent');
        }
    }
}

$(document).on('click', 'a[href^="#"]', function(e) {
    var target = $(this).attr('href');
    
    if(target !== '#' && $(target).length) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 500);
    }
});

// Minecraft Server Status Check
function checkServerStatus() {
    const serverIP = 'play.kumomc.xyz'; // Change this to your server IP
    const apiURL = `https://api.mcsrvstat.us/3/${serverIP}`;
    
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const playerCountEl = document.getElementById('playerCount');
            const statusIndicator = document.getElementById('statusIndicator');
            
            if (data.online) {
                // Server is online
                const playerCount = data.players ? data.players.online : 0;
                playerCountEl.textContent = playerCount;
                statusIndicator.classList.add('online');
                statusIndicator.classList.remove('offline');
            } else {
                // Server is offline
                playerCountEl.textContent = '0';
                statusIndicator.classList.add('offline');
                statusIndicator.classList.remove('online');
            }
        })
        .catch(error => {
            console.error('Error fetching server status:', error);
            document.getElementById('playerCount').textContent = '--';
        });
}

// Check status on page load
if (document.getElementById('playerCount')) {
    checkServerStatus();
    // Refresh every 60 seconds
    setInterval(checkServerStatus, 60000);
}