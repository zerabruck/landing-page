$(document).ready(function() {
    // use custom form box style
    $('#options').select2({
    });
    
    // Hide the sidebar initially
    $('#hiddeSidebar').hide();
    // Set the initial left position of #sideIcon to 0
    $('#sideIcon').css('left', '0');
    $('#sideIcon').click(function() {
      $('#hiddeSidebar').toggle();
  
      var sidebarVisible = $('#hiddeSidebar').is(':visible');
      $('#sideIcon').css('left', sidebarVisible ? '300px' : '0');
    });

    $('#crossIcon').click(function() {
        // Hide the sidebar when clicking the crossIcon
        $('#hiddeSidebar').hide();
        // Reset the left position of #sideIcon to 0
        $('#sideIcon').css('left', '0');
      });


      // acessbility
    var clickCount = 0;
  
    $('#zoomButton').click(function() {
      clickCount++;
  
      if (clickCount === 1) {
        // First click, scale 1
        $('#section1').css('transform', 'scale(1.1)');
        $('#section2').css('transform', 'scale(1.1)');
        $('#section3').css('transform', 'scale(1.1)');
      } else if (clickCount === 2) {
        $('#section1').css('transform', 'scale(1.2)');
        $('#section2').css('transform', 'scale(1.2)');
        $('#section3').css('transform', 'scale(1.2)');
      } else if (clickCount === 3) {
        $('#section1').css('transform', 'scale(1.3)');
        $('#section2').css('transform', 'scale(1.3)');
        $('#section3').css('transform', 'scale(1.3)');
      } else if (clickCount === 4) {
        // Fourth click, set scale back to normal (1)
        $('#section1').css('transform', 'scale(1)');
        $('#section2').css('transform', 'scale(1)');
        $('#section3').css('transform', 'scale(1)');
        // Reset clickCount to restart the sequence
        clickCount = 0;
      }
    });
  });


  $(document).ready(function() {
    var clickCount = 0;
  
    $('#fontButton').click(function() {
      clickCount++;
  
      if (clickCount === 1) {
        // First click, scale 1
        $('#section1').css('transform', 'scale(0.8)');
        $('#section2').css('transform', 'scale(0.8)');
        $('#section3').css('transform', 'scale(0.9)');
      }  else if (clickCount === 2) {
        // Fourth click, set scale back to normal (1)
        $('#section1').css('transform', 'scale(1)');
        $('#section2').css('transform', 'scale(1)');
        $('#section3').css('transform', 'scale(1)');
        // Reset clickCount to restart the sequence
        clickCount = 0;
      }
    });


    $("#bwButton").click(function() {
        $("body").toggleClass("grayscale");
    });

var colorButton = document.getElementById("changeColorBtn");
    var changLinkBg = document.getElementById("changeBg");

    // Add a click event listener to the button
    colorButton.addEventListener("click", function() {
      // Toggle background color between yellow and default
      if (changLinkBg.style.backgroundColor === "gray") {
        changLinkBg.style.backgroundColor = "transparent"; // Set it back to default
      } else {
        changLinkBg.style.backgroundColor = "gray";
      }
    });


    $('#backColorChange').click(function() {
        // Toggle the 'highlight' class for sections 1, 2, and 3
        $('#section1, #midRight, #section3').toggleClass('bg-color');
        $('#midLeft').toggleClass('bg-color2');
      });
    });

      
// to review:

// sending api request 
function submitForm() {
        // Get form data
        var formData = new FormData(document.getElementById('myForm'));

        // Send POST request using fetch
        fetch('ajax-contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Handle success response
            console.log(data);
            // You can perform additional actions here if needed
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });
    }
