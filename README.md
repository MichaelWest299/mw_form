##Multi-step form dynamically populated by JSON data



* [Setup (OSX)](#setup-instructions-osx)
* [Gulp](#gulp-has-been-configured-to:)
* [Templates](#templates-included-in-src/templates/partials/)
* [JSON Data](#json-data)
  * [Textarea](#textarea)
  * [Details](#details)
  * [Radio](#radio)
  * [Checkbox](#checkbox)
* [Modules](#modules)
  * [jsonHandler](#jsonHandler)
  * [dynamicLoad](#dynamicLoad)
  * [validation](#validation)
  * [submitHandler](#submitHandler)
* [License](#license)

##Setup Instructions OSX
####In terminal, clone to your local machine,
```
git clone https://github.com/MichaelWest299/mw_form
```
####Navigate to project directory
```
cd ~/mw_form
```
####Install dependencies
```
npm install
```
####Start the default gulp task
```
gulp
```
####Your default browser should open at
```
http://localhost:3000/html/
```
####Gulp has been configured to:
- pre-compile handbars templates
- concat js files
- convert .scss files to .css
- minify js, json and css
- start up a local server and open in your default browser

####Templates included in src/templates/partials/
- textarea - for additional user comments
- details - including real-time validation for name, tel, email, and URL
- radio - customizable multiple choice question
- checkbox - customizable set of checkboxes
- add some more if you'd like!

##JSON Data
####Each template pulls data from data/formdata.json
```json
{
  "title": "Form title",
  "welcomemessage": "Message displayed on first slide",
  "submitmessage": "Message displayed on submit slide",
  "thankyoumessage": "Message displayed after submission",
  "questions": []
}
```
####The questions array can be populated by the following question types:
####Textarea
```json
{
  "name": "Question number here e.g. question1",
  "title": "Title of the question",
  "type": "textarea",
  "placeholder": "Placeholder text"
}
```
####Details
#####Note: You are not limited to 4 details
```json
{
  "name": "Question number here e.g. question1",
  "title": "Title of the question",
  "type": "details",
  "answers": [{
    "value": 1,
    "title": "Placeholder text",
    "type": "choose from email, name, tel or url"
  }, {
    "value": 2,
    "title": "placeholder text",
    "type": "choose from email, name, tel or url"
  }, {
    "value": 3,
    "title": "placeholder text",
    "type": "choose from email, name, tel or url"
  }, {
    "value": 4,
    "title": "placeholder text",
    "type": "choose from email, name, tel or url"
  }]
}
```

####Radio
#####Note: You are not limited to 5 answers
```json
{
  "name": "Question number here e.g. question1",
  "title": "Title of the question",
  "type": "radio",
  "answers": [{
    "value": 1,
    "title": "Title of radio 1"
  }, {
    "value": 2,
    "title": "Title of radio 2"
  }, {
    "value": 3,
    "title": "Title of radio 3"
  }, {
    "value": 4,
    "title": "Title of radio 4"
  }, {
    "value": 5,
    "title": "Title of radio 5"
  }]
}
```

####Checkbox
#####Note: You are not limited to 4 answers
```json
{
  "name": "Question number here e.g. question1",
  "title": "Title of the question",
  "type": "checkbox",
  "answers": [{
    "value": 1,
    "title": "Title of checkbox 1"
  }, {
    "value": 2,
    "title": "Title of checkbox 2"
  }, {
    "value": 3,
    "title": "Title of checkbox 3"
  }, {
    "value": 4,
    "title": "Title of checkbox 4"
  }]
}
```

#####[License](LICENSE)
