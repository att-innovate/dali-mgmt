## Dali-Mgmt User Manual

### Settings

The settings page is used to enter the address of the Dali-Server. If server isn't reachable you won't see any marks listed.
Example for iPhone simulator connecting to local Dali-Server:

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/settings.png)


### Marks

The Marks page lists all the marks retrieved from the Dali-Server. The annotations for each mark can be edited, but no additional marks can get created. Marks can only be created via the Dali-HoloLens App or through the Dali-Server API.

The Edit button allows you to edit the annotation for a specific mark. The button is rendered in bold for marks that currently don’t have annotations.

Marks can be filtered by the buttons at the bottom.

The Refresh button can be used to reload the list in cases where new Marks got created via the Dali-HoloLens App or the Dali-Server API while the application was already running.

The Settings button provides a way to change the url for the Dali-Server.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/marks.png)


### Mark Editor

The editor is used to add or change the annotations for a specific mark.

The Type field shows the currently selected annotation type. The type can be changed by clicking on the value of the Type field. The field will show undefined when no annotation is assigned.

The lower part of the page will change and according to the select type show a type-specific editor.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/markeditor.png)


### Annotation Type Picker

When clicking on the type of the annotation in the Mark Editor an Annotation Type Picker will show up listing all the available annotation types.

The undefined type can be used to remove an annotation from the specified mark.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/typepicker.png)


### Note Annotation

A simple text field allows you to add a note to a specified mark.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/noteeditor.png)


### Tasklist Annotation

A simple text field provides a way to enter a list of task for the selected mark. Each line will show up as individual item on the Dali-HoloLens application.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/tasklisteditor.png)


### Image Annotation

An image from a pre-defined list can be selected by clicking on the “select image” value.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/imageeditor.png)


The list of available images:

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/imagepicker.png)


### Link Annotation

A link to a web site can be entered. That web site will be shown in Dali-HoloLens at the specific mark. Examples are weather or news sites for marks at home or metrics dashboards for marks in data-centers.

![firststart](https://github.com/att-innovate/dali-mgmt/blob/master/docs/linkeditor.png)

