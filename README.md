##Multi-step form dynamically populated by JSON data

###Contents
* [Setup (OSX)](#setup-instructions-osx)
* [Gulp](#gulp-has-been-configured-to)
* [Templates](#templates-included-in-src/templates/partials/)
* [JSON Data](#json-data)
  * [Textarea](#textarea)
  * [Details](#details)
  * [Radio](#radio)
  * [Checkbox](#checkbox)
* [Modules](#modules)
  * [jsonHandler](#mw_app.jsonHandler)
  * [dynamicLoad](#mw_app.dynamicLoad)
  * [validation](#mw_app.validation)
  * [submitHandler](#mw_app.submitHandler)
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

---

####Gulp has been configured to
- pre-compile handbars templates
- concat js files
- convert .scss files to .css
- minify js, json and css
- start up a local server and open in your default browser

---

####Templates included in src/templates/partials/
- textarea - for additional user comments
- details - including real-time validation for name, tel, email, and URL
- radio - customizable multiple choice question
- checkbox - customizable set of checkboxes
- add some more if you'd like!

---

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

---

##Modules
###My src/js files follow the [module pattern](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html), all sub-modules belong to the namespace mw_app
###mw_app.jsonHandler
#####Main private methods
- ajaxCall() fetches data from src/json/formdata.json
- compileHandlebars() fetches pre-compiled hbs templates

###mw_app.dynamicLoad
#####Main private methods
- eventNext() & eventPrev() are bound to the next and previous buttons respectively, fading out current fieldset and showing the next/previous fieldset

###mw_app.validation
#####Main public methods
- resetValidation(currentInputElement)
- validate() provides real-time validation for the details section of the form

#####Reset usage
#####To reset validation on _all_ input fields
```
mw_app.validation.resetValidation('input')
```
#####To reset validation of all text input fields
```
mw_app.validation.resetValidation('input[type=text]')
```
#####This can be done for any of the input types supported in this form - email, text, url and tel.

###mw_app.submitHandler
#####Main private methods
- preventEnterSubmit - Fixes a bug where a user could end form by pressing the enter key
- createJsonOnSubmission - Uses serializeObject to transform final form input into a JSON object, this is logged to console, but could be grabbed by an API.

#####[License](LICENSE)
