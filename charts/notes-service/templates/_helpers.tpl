{{- define "notes-service.name" -}}
notes-service
{{- end }}

{{- define "notes-service.fullname" -}}
{{ include "notes-service.name" . }}
{{- end }}

{{- define "notes-service.labels" -}}
app.kubernetes.io/name: {{ include "notes-service.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "notes-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "notes-service.name" . }}
{{- end }}
