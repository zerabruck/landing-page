<?php
if($_POST['submit'])
{      
    function curl($url, $past = null,$reheader,$test_type) {
    	$ch = curl_init(); 
    	curl_setopt($ch, CURLOPT_URL, $url);
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, $test_type);
        curl_setopt($ch, CURLOPT_HEADER, $reheader);
        curl_setopt($ch, CURLOPT_NOBODY, 0);
        
    	if( $past != null )
        {
            curl_setopt($ch, CURLOPT_POST, 1);
    		curl_setopt($ch, CURLOPT_POSTFIELDS, $past);
        }
        else
        {
            curl_setopt($ch, CURLOPT_POST, 0);
        }
    
    	$out = curl_exec($ch); 
    	if(curl_errno($ch)){ 
    	  $out = null;
    	} 
    	curl_close($ch);
    	return $out;
    }
    function xssCln($var)
    {
        $var = htmlspecialchars($var, ENT_QUOTES | ENT_HTML401, 'UTF-8');
        return $var;
    }
    if(is_array($_REQUEST)) 
    { 
        foreach($_REQUEST as $key => $value) 
        { 
            $newKey = xssCln($key);
            $newValue = xssCln($value);
            $_REQUEST[$newKey] = $newValue;     
        } 
    }
    
    date_default_timezone_set('Asia/Jerusalem');
    
    // $from = 'tennis@tennis.org.il';
    
    // $to = 'danielo@tennis.org.il,chenb@tennis.org.il,tennisisrael2018@gmail.com,leads@tennisisrael.co.il';
    // $fname = $_REQUEST['fullname'];
    // $phone = substr_replace($_REQUEST['phone'], '-', 3, 0);
    // $email = $_REQUEST['email'];
    // $branch = $_REQUEST['branch'];
    // $ext = $_REQUEST['ext'];
    // $imun = $_REQUEST['imun'];
    // $subject = 'ליד קורס אביב 2020';
    
    // $headers = "From: {$from}\r\n";
    // $headers .= "MIME-Version: 1.0\r\n";
    // $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    // $msg = '<html><body style="direction: ltr; text-align: left;font-family:Arial;">';

    // $msg .= '<table dir="rtl" border="0" cellspacing="0" cellpadding="0" align="right" style="font-family:Arial,sans-serif">';
    // $msg .= '<tr><td colspan="2" valign="top" style="border:solid white 1.0pt;background:#ABD46E;padding:7.5pt 7.5pt 7.5pt 7.5pt;">לכבוד: ליד קורס אביב 2020</td></tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">שם:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$fname.'</td>';
    // $msg .= '</tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">דוא"ל:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$email.'</td>';
    // $msg .= '</tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">טלפון:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$phone.'</td>';
    // $msg .= '</tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">מרכז:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$branch.'</td>';
    // $msg .= '</tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">שלוחה:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$ext.'</td>';
    // $msg .= '</tr>';
    // $msg .= '<tr>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">סוג אימון:</td>';
    // $msg .= '<td valign="top" style="border:none;border-bottom:solid gray 1.0pt;padding:7.5pt 7.5pt 7.5pt 7.5pt">'.$imun.'</td>';
    // $msg .= '</tr>';
    // $msg .= '</table>';
    
    // $msg .= '</body></html>';

    // mail($to, $subject, $msg, $headers);
    
    // Send lead to lead.im
    $curl_lead = curl('',http_build_query($_POST['data_lead_arr']),true,false);
    
    echo 'success';
}
?>