<?php

    function trackingRequest(){
// S24DEMO456393
        if (isset($_POST['track'])) {
            $tracking_number = addslashes($_POST['tracking_number']);
            $curl = curl_init();

            curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.ship24.com/public/v1/tracking/search',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS =>'{
                "trackingNumber": "'.$tracking_number.'"
            }',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json; charset=utf-8',
                'Authorization: Bearer apik_JHx77IyyrsjoJDwH7Bw7ceQBBl6DIt'
            ),
            ));

            $response = curl_exec($curl);

            // echo $response;

            curl_close($curl);
            $data = json_decode($response, true);
            $result = $data['data']['trackings'];
            $counter = 0;
            $shipment =  json_encode($result[$counter]['shipment'], JSON_FORCE_OBJECT);
            $events =  json_encode($result[$counter]['events'], JSON_FORCE_OBJECT);
            $shipment_details = json_decode($shipment, true);
            $event_details = json_decode($events, true);

            if (sizeof($result[$counter]['events'])>0 ) {   
            
                echo '
                <div class="card text-center">
                    <div class="card-header">
                    '.$event_details[$counter]['trackingNumber'].'
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Shipment ID: '.$shipment_details['shipmentId'].'</h5>
                        <p class="card-text">Origin Country: '.$shipment_details['originCountryCode'].' - Destination Country: '.$shipment_details['destinationCountryCode'].'</p>
                        <a href="#" class="btn btn-primary">'.$shipment_details['statusCategory'].'</a>
                    </div>
                    <div class="card-footer text-muted">
                        ...
                    </div>
                </div>
                <div class="table-responsive">
                <table class="table table-hover">
                    <thead class="thead-dark ">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tracking Number</th>
                        <th scope="col">Event Tracking #</th>
                        <th scope="col">Date Time</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                ';

                    foreach($event_details as $key=>$event){
                        echo '
                        <tr>
                            <th scope="row">' . $key. '</th>
                            <td>'. $event_details[$key]['trackingNumber'] .'</td>
                            <td>'. $event_details[$key]['eventTrackingNumber'] .'</td>
                            <td>'. $event_details[$key]['datetime'] .'</td>
                            <td>'. $event_details[$key]['location'] .'</td>
                            <td>'. $event_details[$key]['status'] . '</td>
                        </tr>';
                    }

                echo "</tbody></table></div>";

            }else{
                echo '
                <br>
                <div class="alert alert-warning align-items-center" role="alert" >
                    <center>Tracking number cannot be found in our database. Please ensure your tracking number is correct.</center>
                </div>';
            }
            
        }
    }
?>
