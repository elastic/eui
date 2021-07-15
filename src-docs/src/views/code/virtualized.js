import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

export default () => (
  <div>
    <EuiCodeBlock language="json" overflowHeight={300} isCopyable isVirtualized>
      {`{
  "size": 500,
  "sort": [
    {
      "@timestamp": {
        "order": "desc",
        "unmapped_type": "boolean"
      }
    }
  ],
  "version": true,
  "fields": [
    {
      "field": "*",
      "include_unmapped": "true"
    },
    {
      "field": "@timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "aws.cloudtrail.digest.end_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "aws.cloudtrail.digest.newest_event_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "aws.cloudtrail.digest.oldest_event_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "aws.cloudtrail.digest.start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "aws.cloudtrail.user_identity.session_context.creation_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "azure.auditlogs.properties.activity_datetime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "azure.enqueued_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "azure.signinlogs.properties.created_at",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.agentReceiptTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.deviceCustomDate1",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.deviceCustomDate2",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.deviceReceiptTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.endTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.fileCreateTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.fileModificationTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.flexDate1",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.managerReceiptTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.oldFileCreateTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.oldFileModificationTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cef.extensions.startTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "checkpoint.subs_exp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cisco.amp.threat_hunting.incident_end_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cisco.amp.threat_hunting.incident_start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "cisco.amp.timestamp_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.EndTimestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.IncidentEndTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.IncidentStartTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.ProcessEndTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.ProcessStartTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.StartTimestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.Timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.event.UTCTimestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "crowdstrike.metadata.eventCreationTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "event.created",
      "format": "strict_date_optional_time"
    },
    {
      "field": "event.end",
      "format": "strict_date_optional_time"
    },
    {
      "field": "event.ingested",
      "format": "strict_date_optional_time"
    },
    {
      "field": "event.start",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.accessed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.created",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.ctime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.mtime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.x509.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "file.x509.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "google_workspace.admin.email.log_search_filter.end_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "google_workspace.admin.email.log_search_filter.start_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "google_workspace.admin.user.birthdate",
      "format": "strict_date_optional_time"
    },
    {
      "field": "gsuite.admin.email.log_search_filter.end_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "gsuite.admin.email.log_search_filter.start_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "gsuite.admin.user.birthdate",
      "format": "strict_date_optional_time"
    },
    {
      "field": "juniper.srx.elapsed_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "juniper.srx.epoch_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "juniper.srx.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "kafka.block_timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "microsoft.defender_atp.lastUpdateTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "microsoft.defender_atp.resolvedTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "microsoft.m365_defender.alerts.creationTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "microsoft.m365_defender.alerts.lastUpdatedTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "microsoft.m365_defender.alerts.resolvedTime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.campaign.first_seen",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.campaign.last_seen",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.intrusion_set.first_seen",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.intrusion_set.last_seen",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.observed_data.first_observed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.observed_data.last_observed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.report.published",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.threat_indicator.valid_from",
      "format": "strict_date_optional_time"
    },
    {
      "field": "misp.threat_indicator.valid_until",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.collection_time_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.exporter.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_end_microseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_end_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_end_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_end_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_start_microseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_start_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_start_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.flow_start_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.max_export_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.max_flow_end_microseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.max_flow_end_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.max_flow_end_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.max_flow_end_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.min_export_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.min_flow_start_microseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.min_flow_start_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.min_flow_start_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.min_flow_start_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.monitoring_interval_end_milli_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.monitoring_interval_start_milli_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.observation_time_microseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.observation_time_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.observation_time_nanoseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.observation_time_seconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "netflow.system_init_time_milliseconds",
      "format": "strict_date_optional_time"
    },
    {
      "field": "package.installed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "pensando.dfw.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "postgresql.log.session_start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "process.parent.start",
      "format": "strict_date_optional_time"
    },
    {
      "field": "process.start",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.internal.lc_ctime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.internal.time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.effective_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.endtime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.event_queue_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.event_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.expire_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.recorded_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.stamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "rsa.time.starttime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "snyk.vulnerabilities.disclosure_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "snyk.vulnerabilities.introduced_date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "snyk.vulnerabilities.publication_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "sophos.xg.date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "sophos.xg.eventtime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "sophos.xg.start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "sophos.xg.starttime",
      "format": "strict_date_optional_time"
    },
    {
      "field": "sophos.xg.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "suricata.eve.flow.start",
      "format": "strict_date_optional_time"
    },
    {
      "field": "suricata.eve.tls.notafter",
      "format": "strict_date_optional_time"
    },
    {
      "field": "suricata.eve.tls.notbefore",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.anomali.modified",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.anomali.valid_from",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.indicator.last_seen",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.misp.attribute.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.misp.date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.misp.publish_timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "threatintel.misp.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.client.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.client.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.client.x509.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.client.x509.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.server.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.server.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.server.x509.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "tls.server.x509.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "x509.not_after",
      "format": "strict_date_optional_time"
    },
    {
      "field": "x509.not_before",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.kerberos.valid.from",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.kerberos.valid.until",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.ocsp.revoke.time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.ocsp.update.next",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.ocsp.update.this",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.pe.compile_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.smb_files.times.accessed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.smb_files.times.changed",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.smb_files.times.created",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.smb_files.times.modified",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.smtp.date",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.snmp.up_since",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.x509.certificate.valid.from",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zeek.x509.certificate.valid.until",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.meeting.start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.participant.join_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.participant.leave_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.phone.answer_start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.phone.call_end_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.phone.connected_start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.phone.date_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.phone.ringing_start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.recording.recording_file.recording_end",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.recording.recording_file.recording_start",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.recording.start_time",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.timestamp",
      "format": "strict_date_optional_time"
    },
    {
      "field": "zoom.webinar.start_time",
      "format": "strict_date_optional_time"
    }
  ],
  "aggs": {
    "2": {
      "date_histogram": {
        "field": "@timestamp",
        "fixed_interval": "30s",
        "time_zone": "America/Chicago",
        "min_doc_count": 1
      }
    }
  },
  "script_fields": {},
  "stored_fields": [
    "*"
  ],
  "runtime_mappings": {},
  "_source": false,
  "query": {
    "bool": {
      "must": [],
      "filter": [
        {
          "match_all": {}
        },
        {
          "range": {
            "@timestamp": {
              "gte": "2021-07-13T20:40:15.011Z",
              "lte": "2021-07-13T20:55:15.011Z",
              "format": "strict_date_optional_time"
            }
          }
        }
      ],
      "should": [],
      "must_not": []
    }
  },
  "highlight": {
    "pre_tags": [
      "@kibana-highlighted-field@"
    ],
    "post_tags": [
      "@/kibana-highlighted-field@"
    ],
    "fields": {
      "*": {}
    },
    "fragment_size": 2147483647
  }
}`}
    </EuiCodeBlock>
  </div>
);
