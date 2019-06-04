module.exports = {
conf: {
    title: 'CVE Info notes',
    unwind: {
        $unwind: '$body.track'
    },
    name: 'FYI',
    class: 'icn source',
    shortcuts: [
        {
            label: 'My Notes',
            href: function (g) {
                return '/note/?owner=' + g.user.username;
            },
            class: 'icn folder'
        }
    ]
},
facet: {
    ID: {
        path: 'body.CVE',
        regex: 'CVE[0-9-]+',
        sortDefault: '-ID'
    },
/*    CVE: {
        path: 'body.CVE',
        link: 'https://nvd.nist.gov/vuln/detail/'
    },*/
    product: {
        path: 'body.track.prod',
        chart: true,
        pipeline: [
            {
                $unwind: "$body.track"
            },
            {
                $sortByCount: "$body.track.prod"
            }
        ],
    },
    info: {
        path: 'body.track.note',
        pipeline: [
            {
                $unwind: "$body.track"
            },
            {
                $sortByCount: "$body.track.note"
            }
        ],
    },
 /*  owner: {
        path: 'body.track.im',
        pipeline: [
            {
                $unwind: "$body.track"
            },
            {
                $sortByCount: "$body.track.im"
            }
        ],
        chart: true,
    }*/
},
schema: {
    
  "$id": "http://example.com/example.json",
  "type": "object",
  "properties": {
    "CVE": {
      "$id": "/properties/CVE",
      "type": "string",
      "title": "CVE",
      "default": "",
      "examples": [
        "CVE"
      ]
    },
    "track": {
      "$id": "/properties/track",
      "type": "array",
        "format": "table",
      "items": {
        "$id": "/properties/track/items",
        "type": "object",
        "properties": {
          "prod": {
            "$id": "/properties/track/items/properties/prod",
            "type": "string",
            "title": "Product",
            "default": "",
            "$ref": "/product/examples/?field=body.product_group"
          },
          "note": {
            "$id": "/properties/track/items/properties/note",
            "type": "string",
            "format": "simplehtml",
            "title": "Note",
            "default": "",
            "examples": [
              "note"
            ]
          },
          "im": {
            "$id": "/properties/track/items/properties/im",
            "type": "string",
            "title": "Owner",
            "default": "",
            "options": {
                hidden: true,
            }
          }
        }
      }
    }
  }

    
    
}
}