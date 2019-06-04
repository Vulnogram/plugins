module.exports = {
conf: {
    title: 'Contacts',
    name: 'Contacts',
    class: 'icn EXTERNAL'
},
facet: {
    ID: {
        path: 'body.email',
        regex: '[a-zA-Z0-9-\._@]{4,}'
    },
    First: {
        path: 'body.firstname'
    },
    Last: {
        path: 'body.lastname'
    },
    Org: {
        path: 'body.organization'
    },
    Credit: {
        path: 'body.credit_text'
    }
},
schema: {
  "type": "object",
  "properties": {
    "firstname": {
      "$id": "/properties/First Name",
      "type": "string",
      "title": "First name",
      "description": "First name Eg., Robert",
      "default": "",
      "examples": [
        "Robert"
      ],
      "options": {
        "class": 'user'
      },
      "maxLength": 128
    },
    "lastname": {
      "$id": "/properties/Last Name",
      "type": "string",
      "title": "Last name",
      "default": "",
      "examples": [
        "Jones"
      ],
      "maxLength": 36
    },
    "organization": {
      "$id": "/properties/organization",
      "type": "string",
      "title": "organization",
      "default": "",
      "examples": [
        "Robert Jones, Inc."
      ],
      "maxLength": 256
    },
    "allow_credit": {
      "$id": "/properties/Attribution Allowed",
      "type": "boolean",
        "title": "credit allowed",
      "default": "true",
      "format": "checkbox",
    },
    "credit_text": {
      "type": "string",
      "title": "credit text",
      "default": ""
    },      
    "email": {
      "$id": "/properties/Email",
      "type": "string",
      "title": "Primary email",
      "default": "",
      "examples": [
        "robert@robertjones.com"
      ],
      "minLength": 5,
      "pattern": ""
    },
    "name-org-email": {
        "options": {
          "hidden": "true"  
        },
        type: "string",
        "template": "(context.fn || context.ln ? [context.fn, context.ln].join(' ').trim() + (context.org ? ' of '+ context.org : ''): '') + (context.eml ? ' ' + context.eml : '')",
       "watch": {
                    "fn": "root.firstname",
                    "ln": "root.lastname",
                    "org": "root.organization",
                    "eml": "root.email"
        },    
    },
    "secondemail": {
      "$id": "/properties/Secondary Email",
      "type": "string",
      "title": "Alternate email",
      "default": "",
      "examples": [
        "bobjones@robertjones.com"
      ],
      "pattern": ""
    },
    "phone": {
      "$id": "/properties/Primary Phone",
      "type": "string",
      "title": "phone",
      "default": "",
      "examples": [
        "+1(555)555-5555"
      ],
      "maxLength": 30
    },
    "country": {
      "$id": "/properties/Country",
      "type": "string",
              "options": {
                "class": 'web'
                },
        "examples" : ["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia (Plurinational State of)","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","United States Minor Outlying Islands","Virgin Islands (British)","Virgin Islands (U.S.)","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cabo Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo (Democratic Republic of the)","Cook Islands","Costa Rica","Croatia","Cuba","Curaçao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Côte d'Ivoire","Iran (Islamic Republic of)","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia (the former Yugoslav Republic of)","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia (Federated States of)","Moldova (Republic of)","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Korea (Democratic People's Republic of)","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Republic of Kosovo","Réunion","Romania","Russian Federation","Rwanda","Saint Barthélemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","Korea (Republic of)","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom of Great Britain and Northern Ireland","United States of America","Uruguay","Uzbekistan","Vanuatu","Venezuela (Bolivarian Republic of)","Viet Nam","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"],
      "title": "Country",
      "default": "United States of America",
      "maxLength": 70
    },
    "PGP Preferred": {
      "$id": "/properties/PGP Preferred",
      "type": "boolean",
      "default": "false",
      "format": "checkbox"
    },
    "PGP Key": {
      "$id": "/properties/PGP Key",
      "type": "string",
      "title": "Pgp key",
      "default": "",
      "examples": [
        ""
      ]
    }
}
}
}