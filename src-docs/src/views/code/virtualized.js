import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <div>
    <EuiCodeBlock language="json" overflowHeight={300} isCopyable isVirtualized>
      {`{
  "id": "1",
  "rawResponse": {
    "took": 19,
    "timed_out": false,
    "_shards": {
      "total": 1,
      "successful": 1,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": 7,
      "max_score": null,
      "hits": [
        {
          "_index": "kibana_sample_data_flights",
          "_id": "i5-sr3oB9JvwH6mY-m2Q",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Wichita Mid Continent Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  -97.43309784,
                  37.64989853
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "Q4UQIF3"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  8.54917,
                  47.464699
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              true
            ],
            "DistanceMiles": [
              5013.5835
            ],
            "FlightTimeMin": [
              822.3817
            ],
            "OriginWeather": [
              "Cloudy"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              276.2003
            ],
            "Carrier": [
              "JetBeats"
            ],
            "FlightDelayMin": [
              150
            ],
            "OriginRegion": [
              "US-KS"
            ],
            "DestAirportID": [
              "ZRH"
            ],
            "FlightDelayType": [
              "Carrier Delay"
            ],
            "hour_of_day": [
              14
            ],
            "timestamp": [
              "2021-07-16T14:15:29.000Z"
            ],
            "Dest": [
              "Zurich Airport"
            ],
            "FlightTimeHour": [
              "13.706362235285443"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              8068.5806
            ],
            "OriginCityName": [
              "Wichita"
            ],
            "DestWeather": [
              "Rain"
            ],
            "OriginCountry": [
              "US"
            ],
            "DestCountry": [
              "CH"
            ],
            "DestRegion": [
              "CH-ZH"
            ],
            "OriginAirportID": [
              "ICT"
            ],
            "DestCityName": [
              "Zurich"
            ]
          },
          "sort": [
            1626444929000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "AZ-sr3oB9JvwH6mY-m2P",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Turin Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  7.64963,
                  45.200802
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "WR15PZZ"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  20.96710014,
                  52.16569901
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              false
            ],
            "DistanceMiles": [
              774.4176
            ],
            "FlightTimeMin": [
              95.86956
            ],
            "OriginWeather": [
              "Clear"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              360.27106
            ],
            "Carrier": [
              "Kibana Airlines"
            ],
            "FlightDelayMin": [
              0
            ],
            "OriginRegion": [
              "IT-21"
            ],
            "DestAirportID": [
              "WAW"
            ],
            "FlightDelayType": [
              "No Delay"
            ],
            "hour_of_day": [
              14
            ],
            "timestamp": [
              "2021-07-16T14:14:06.000Z"
            ],
            "Dest": [
              "Warsaw Chopin Airport"
            ],
            "FlightTimeHour": [
              "1.597826006729792"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              1246.3043
            ],
            "OriginCityName": [
              "Torino"
            ],
            "DestWeather": [
              "Thunder & Lightning"
            ],
            "OriginCountry": [
              "IT"
            ],
            "DestCountry": [
              "PL"
            ],
            "DestRegion": [
              "PL-MZ"
            ],
            "OriginAirportID": [
              "TO11"
            ],
            "DestCityName": [
              "Warsaw"
            ]
          },
          "sort": [
            1626444846000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "LJ-sr3oB9JvwH6mY-m6Q",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Chhatrapati Shivaji International Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  72.86789703,
                  19.08869934
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "VZNTLIZ"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  33.46390152,
                  68.15180206
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              false
            ],
            "DistanceMiles": [
              3791.431
            ],
            "FlightTimeMin": [
              305.08582
            ],
            "OriginWeather": [
              "Cloudy"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              845.4707
            ],
            "Carrier": [
              "JetBeats"
            ],
            "FlightDelayMin": [
              0
            ],
            "OriginRegion": [
              "SE-BD"
            ],
            "DestAirportID": [
              "XLMO"
            ],
            "FlightDelayType": [
              "No Delay"
            ],
            "hour_of_day": [
              14
            ],
            "timestamp": [
              "2021-07-16T14:05:44.000Z"
            ],
            "Dest": [
              "Olenya Air Base"
            ],
            "FlightTimeHour": [
              "5.084763808440013"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              6101.717
            ],
            "OriginCityName": [
              "Mumbai"
            ],
            "DestWeather": [
              "Heavy Fog"
            ],
            "OriginCountry": [
              "IN"
            ],
            "DestCountry": [
              "RU"
            ],
            "DestRegion": [
              "RU-MUR"
            ],
            "OriginAirportID": [
              "BOM"
            ],
            "DestCityName": [
              "Olenegorsk"
            ]
          },
          "sort": [
            1626444344000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "Hp-sr3oB9JvwH6mY-m2P",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Buffalo Niagara International Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  -78.73220062,
                  42.94049835
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "QAXVRPQ"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  -78.3575,
                  -0.129166667
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              false
            ],
            "DistanceMiles": [
              2964.2756
            ],
            "FlightTimeMin": [
              227.16853
            ],
            "OriginWeather": [
              "Sunny"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              719.76935
            ],
            "Carrier": [
              "JetBeats"
            ],
            "FlightDelayMin": [
              0
            ],
            "OriginRegion": [
              "US-NY"
            ],
            "DestAirportID": [
              "UIO"
            ],
            "FlightDelayType": [
              "No Delay"
            ],
            "hour_of_day": [
              13
            ],
            "timestamp": [
              "2021-07-16T13:57:30.000Z"
            ],
            "Dest": [
              "Mariscal Sucre International Airport"
            ],
            "FlightTimeHour": [
              "3.7861423240197563"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              4770.5396
            ],
            "OriginCityName": [
              "Buffalo"
            ],
            "DestWeather": [
              "Clear"
            ],
            "OriginCountry": [
              "US"
            ],
            "DestCountry": [
              "EC"
            ],
            "DestRegion": [
              "EC-P"
            ],
            "OriginAirportID": [
              "BUF"
            ],
            "DestCityName": [
              "Quito"
            ]
          },
          "sort": [
            1626443850000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "U5-sr3oB9JvwH6mY-m2Q",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Dubai International Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  55.36439896,
                  25.25279999
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "TJQKCKN"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  -73.74079895,
                  45.47060013
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              false
            ],
            "DistanceMiles": [
              6611.2646
            ],
            "FlightTimeMin": [
              709.31995
            ],
            "OriginWeather": [
              "Rain"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              756.61444
            ],
            "Carrier": [
              "ES-Air"
            ],
            "FlightDelayMin": [
              0
            ],
            "OriginRegion": [
              "SE-BD"
            ],
            "DestAirportID": [
              "YUL"
            ],
            "FlightDelayType": [
              "No Delay"
            ],
            "hour_of_day": [
              13
            ],
            "timestamp": [
              "2021-07-16T13:51:52.000Z"
            ],
            "Dest": [
              "Montreal / Pierre Elliott Trudeau International Airport"
            ],
            "FlightTimeHour": [
              "11.821998598483413"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              10639.799
            ],
            "OriginCityName": [
              "Dubai"
            ],
            "DestWeather": [
              "Clear"
            ],
            "OriginCountry": [
              "AE"
            ],
            "DestCountry": [
              "CA"
            ],
            "DestRegion": [
              "CA-QC"
            ],
            "OriginAirportID": [
              "DXB"
            ],
            "DestCityName": [
              "Montreal"
            ]
          },
          "sort": [
            1626443512000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "TJ-sr3oB9JvwH6mY-m2Q",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Jorge Chavez International Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  -77.114304,
                  -12.0219
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "8B6BGMO"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  128.445007,
                  51.169997
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              true
            ],
            "DistanceMiles": [
              9375.942
            ],
            "FlightTimeMin": [
              824.16406
            ],
            "OriginWeather": [
              "Cloudy"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              463.068
            ],
            "Carrier": [
              "Logstash Airways"
            ],
            "FlightDelayMin": [
              30
            ],
            "OriginRegion": [
              "SE-BD"
            ],
            "DestAirportID": [
              "XHBU"
            ],
            "FlightDelayType": [
              "Late Aircraft Delay"
            ],
            "hour_of_day": [
              13
            ],
            "timestamp": [
              "2021-07-16T13:50:55.000Z"
            ],
            "Dest": [
              "Ukrainka Air Base"
            ],
            "FlightTimeHour": [
              "13.736067768266615"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              15089.117
            ],
            "OriginCityName": [
              "Lima"
            ],
            "DestWeather": [
              "Clear"
            ],
            "OriginCountry": [
              "PE"
            ],
            "DestCountry": [
              "RU"
            ],
            "DestRegion": [
              "RU-AMU"
            ],
            "OriginAirportID": [
              "LIM"
            ],
            "DestCityName": [
              "Belogorsk"
            ]
          },
          "sort": [
            1626443455000
          ]
        },
        {
          "_index": "kibana_sample_data_flights",
          "_id": "3J-sr3oB9JvwH6mY-m2Q",
          "_version": 1,
          "_score": null,
          "fields": {
            "Origin": [
              "Sydney Kingsford Smith International Airport"
            ],
            "OriginLocation": [
              {
                "coordinates": [
                  151.177002,
                  -33.94609833
                ],
                "type": "Point"
              }
            ],
            "FlightNum": [
              "PASAN8N"
            ],
            "DestLocation": [
              {
                "coordinates": [
                  8.54917,
                  47.464699
                ],
                "type": "Point"
              }
            ],
            "FlightDelay": [
              false
            ],
            "DistanceMiles": [
              10293.209
            ],
            "FlightTimeMin": [
              1380.4429
            ],
            "OriginWeather": [
              "Sunny"
            ],
            "dayOfWeek": [
              4
            ],
            "AvgTicketPrice": [
              380.29593
            ],
            "Carrier": [
              "Logstash Airways"
            ],
            "FlightDelayMin": [
              0
            ],
            "OriginRegion": [
              "SE-BD"
            ],
            "DestAirportID": [
              "ZRH"
            ],
            "FlightDelayType": [
              "No Delay"
            ],
            "hour_of_day": [
              13
            ],
            "timestamp": [
              "2021-07-16T13:49:20.000Z"
            ],
            "Dest": [
              "Zurich Airport"
            ],
            "FlightTimeHour": [
              "23.007380215402044"
            ],
            "Cancelled": [
              false
            ],
            "DistanceKilometers": [
              16565.314
            ],
            "OriginCityName": [
              "Sydney"
            ],
            "DestWeather": [
              "Rain"
            ],
            "OriginCountry": [
              "AU"
            ],
            "DestCountry": [
              "CH"
            ],
            "DestRegion": [
              "CH-ZH"
            ],
            "OriginAirportID": [
              "SYD"
            ],
            "DestCityName": [
              "Zurich"
            ]
          },
          "sort": [
            1626443360000
          ]
        }
      ]
    },
    "aggregations": {
      "2": {
        "buckets": [
          {
            "key_as_string": "2021-07-16T08:49:00.000-05:00",
            "key": 1626443340000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T08:50:30.000-05:00",
            "key": 1626443430000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T08:51:30.000-05:00",
            "key": 1626443490000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T08:57:30.000-05:00",
            "key": 1626443850000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T09:05:30.000-05:00",
            "key": 1626444330000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T09:14:00.000-05:00",
            "key": 1626444840000,
            "doc_count": 1
          },
          {
            "key_as_string": "2021-07-16T09:15:00.000-05:00",
            "key": 1626444900000,
            "doc_count": 1
          }
        ]
      }
    }
  },
  "isPartial": false,
  "isRunning": false,
  "total": 1,
  "loaded": 1,
  "isRestored": false
}`}
    </EuiCodeBlock>
  </div>
);
