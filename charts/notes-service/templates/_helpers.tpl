{{- define "notes-service.name" -}}
notes-service
{{- end }}

{{- define "notes-service.fullname" -}}
{{ include "notes-service.name" . }}
{{- end }}
