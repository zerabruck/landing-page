<!DOCTYPE html>
<html lang="he">
<head>

    <title>מרכזי הטניס והחינוך בישראל</title>

    <!-- Content type and encoding -->
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1, user-scalable=yes" /> 
            
    <!-- Link to stylesheet -->
    <link rel="stylesheet" type="text/css" href="media/css/style.css?ver=6" />

    <!--[if lt IE 9]>
    <script src="media/js/plugins/html5.js"></script>
    <script src="media/js/plugins/respond.min.js"></script>
	<link rel="stylesheet" type="text/css" href="media/css/ie.css" />
    <![endif]-->

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M6DZXT7');</script>
    <!-- End Google Tag Manager -->

    <!-- Global site tag (gtag.js) - Google Ads: 977102044 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-977102044"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'AW-977102044');
    </script>

    <?php if(isset($_GET['success'])): ?>
    <!-- Event snippet for Lead conversion page -->
    <script>
    gtag('event', 'conversion', {'send_to': 'AW-977102044/jv5iCO2gxvICENzJ9dED'});
    </script>
    <?php endif; ?>

    <!-- Facebook Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '640496176549048');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=640496176549048&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
    
</head>

<body>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6DZXT7"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Container -->
    <main class="container" id="conatiner">

        <!-- Header -->
        <header class="header" id="header">
            <div class="innerpage">
                <div class="row">
                    <div class="logo"></div>
                    <div class="call_us"><div>למוקד הארצי <strong>6227<span>*</span></strong></div><a href="tel:*6227" class="mobile_call" onclick="fbq('track', 'C2C');gtag_report_conversion();">חייגו עכשיו</a></div>
                </div>
            </div>
        </header>

        <!-- Header -->
        <header class="header footer">
            <div class="innerpage">
                <div class="row">
                    <div class="left">
                        <div class="logo"></div>
                        <div class="facebook"><span>מרכזי הטניס והחינוך בישראל</span></div>
                        <div class="urlphone"><span>*6227 | www.tennis.org.il</span></div>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Box text -->
        <?php if(!isset($_GET['success'])): ?>
        <div class="box_text" id="box_text">
            <div class="bg cover" style="background-image:url('media/images/pictures/1.jpg');"></div>
            <div class="innerpage">
                <div class="table">
                    <div class="table-cell">
                        <div class="box">
                            <h1 class="title_top animate_opacity">רוצים להיות אלופים?</h1>
                            <div class="desci animate_opacity"><strong>החלה ההרשמה לבית הספר המקצועי לטניס!</strong><br />אימוני טניס לילדים בכל הרמות<br />במרחב הפתוח ובהדרכת המאמנים הטובים בישראל.<div class="ages">לגילאי 4-18</div></div>
                            <div class="bag animate_opacity">
                                <img src="media/images/bag2.png?ver=1" class="mobile" alt="מתנה לכל נרשם: תיק + חולצה + מחבט טניס!" />
                                <img src="media/images/bag.png?ver=1" class="desktop" alt="מתנה לכל נרשם: תיק + חולצה + מחבט טניס!" />
                                <div class="rulei">* המתנה לכל נרשם - עד גמר המלאי</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php else: ?>
        <script>fbq('track', 'Lead');</script>
        <div class="box_text success" id="box_text">
            <div class="bg cover" style="background-image:url('media/images/pictures/2.jpg');"></div>
            <div class="innerpage">
                <div class="table">
                    <div class="table-cell">
                        <div class="box">
                            <h1 class="title_top animate_opacity">תודה רבה על פנייתך,<strong>נחזור אליך בהקדם.</strong></h1>
                            <?php if(isset($_GET['callback'])): ?>
                            <a href="<?php echo htmlspecialchars($_GET['callback']); ?>" class="btn">מעבר לאפליקציה</a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php endif; ?>

        <!-- Lead form -->
        <?php if(!isset($_GET['success'])): ?>
        <form class="lead_form" id="lead_form" action="">
            <h2 class="title_form">מספר המקומות מוגבל<strong>הקדימו והירשמו:</strong></h2>
            <div class="inputs_cont">
                <div class="input input_validate"><input type="text" name="fullname" id="input_1" data-mustfill="true" data-minlength="2" aria-label="שם מלא" placeholder="שם מלא*" /></div>
                <div class="input input_validate"><input type="text" name="phone" id="input_2" data-inputtype="phone" data-mustfill="true" aria-label="מספר טלפון" placeholder="מס' טלפון*"  /></div>
                <input type="hidden" name="lm_source" value="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>"  />
                <div class="input input_validate input_select">
                    <select class="cselect" data-mustfill="true" name="branch">
                        <option value="">בחירת מרכז*</option>
                        <option value="אופקים" data-center="12">אופקים</option>
                        <option value="אשקלון" data-center="8">אשקלון</option>
                        <option value="באר שבע" data-center="11">באר שבע</option>
                        <option value="גדידה מכר" data-center="31" data-isext="true">ג'דידה מכר (שלוחה)</option>
                        <option value="גליל - סאגור" data-center="15">גליל - סאג'ור</option>
                        <option value="דימונה" data-center="40">דימונה</option>
                        <option value="חיפה" data-center="5">חיפה</option>
                        <option value="טבריה" data-center="9">טבריה</option>
                        <option value="יפו (וולפסון)" data-center="3">יפו (וולפסון)</option>
                        <option value="יקנעם" data-center="14">יקנעם</option>                        
                        <option value="ירושלים" data-center="7">ירושלים</option>    
                        <option value="מגדל העמק" data-center="45">מגדל העמק</option>    
                        <option value="נהריה" data-center="37">נהריה</option>
                        <option value="עכו" data-center="16">עכו</option>
                        <option value="ערד" data-center="6">ערד</option>            
                        <option value="קריית אונו" data-center="10">קריית אונו</option>
                        <option value="קריית שמונה" data-center="4">קריית שמונה</option>
                        <option value="רמת השרון" data-center="2">רמת השרון</option>
                        <option value="תל אביב (יד אליהו)" data-center="13">תל אביב (יד אליהו)</option>
<!--                         
                        <option value="קריית אונו" data-center="lfv110976" data-isext="true">הולמס פלייס גבעת שמואל (שלוחה)</option>
                        <option value="עכו" data-center="16">עכו</option>
                        <option value="ערד" data-center="6">ערד</option>
                        <option value="קריית שמונה" data-center="lfv110976" data-isext="true">חצור הגלילית (שלוחה)</option> -->
                    </select>
                </div>
                <div class="input"><button type="submit" class="submit btn">שלח</button></div>
            </div>
        </form>
        <?php endif; ?>
        
        <!-- Footer -->
        <footer class="footer" id="footer">
            <div class="innerpage">
                <div class="row">
                    <div class="right">
                        <strong>מרכזי הטניס והחינוך שלנו</strong>
                        <ul>
                            <li><strong>מרכז:</strong> רמת השרון | תל אביב | יפו | קרית אונו | ירושלים</li>
                            <li><strong>צפון:</strong> חיפה | קרית שמונה | טבריה | עכו | יקנעם | גליל סאג'ור | נהריה</li>
                            <li><strong>דרום:</strong> באר שבע | אשקלון | אופקים | ערד</li>
                        </ul>
                    </div>
                    <div class="link_wcag"><a href="media/pdfs/accessibility_statement.pdf" target="_blank">הצהרת נגישות</a></div>
                    <div class="left">
                        <div class="logo"></div>
                        <div class="facebook"><span>מרכזי הטניס והחינוך בישראל</span></div>
                        <div class="urlphone"><span>*6227 | www.tennis.org.il</span></div>
                    </div>
                </div>
            </div>
        </footer>
                
    </main>

    <!-- Scripts -->
    <script src="media/js/plugins/plugins.min.js?ver=6"></script>
    <script src="media/js/global.js?ver=6"></script>
    
</body>
</html>
