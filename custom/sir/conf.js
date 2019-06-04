var express = require('express')
var router = express.Router()
const mongoose = require('mongoose');
const db = mongoose.connection;
module.exports = 
{
    conf: {
    title: 'Security Incident Reports',
    name: 'SIR',
    class: 'icn SIR',
    uri: '/sir/?state=new',
    shortcuts: [{
            label: 'Incoming',
            // CONFIG: change the query to refect the incoming SIR queue.
            href: '/sir/?owner=team',
            class: 'icn new'
        },
        {
            label: 'My SIRs',
            href: function (g) {
                return '/sir/?state=open,new,waiting,pending&owner=' + g.user.username;
            },
            class: 'icn folder'
        }
    ],
    // CONFIG: update path to store attachments.
    files: '/path/to/attachment_storage/'
    },
facet: {
    ID: {
        path: 'body.ID',
        regex: 'SIR-20[0-9]{2}-[0-9]{3,}',
        sortDefault: '-ID'
    },
    date: {
        path: 'body.computed.startDate'
    },
    updated: {
        path: 'updatedAt'
    },
    defect: {
        path: 'body.defect',
        type: [Number],
        href: 'https://example.net/defect/',
        showDistinct: true
    },
    prStatus: {
        path: 'body.computed.prs.state',
        class: 'icn nobr '
    },
    state: {
        path: 'body.STATE',
        tabs: true,
        bulk: true,
        //	chart: true,
        enum: ['new', 'open', 'pending', 'waiting', 'closed'],
        class: 'icn nobr '
    },

    type: {
        path: 'body.TYPE',
        tabs: false,
        chart: true,
        bulk: true,
        enum: ["unsure", "no-vuln", "advisory", "no-advisory", "doc", "misc", "duplicate"],
        class: 'icn nobr '
    },
    discovery: {
        path: 'body.discovery',
        chart: true,
        class: 'icn nobr '
    },
    CVSS: {
        path: 'body.cvss.baseScore',
        type: Number
    },

    CVE: {
        path: 'body.CVE',
        href: 'https://nvd.nist.gov/vuln/detail/',
        showDistinct: true
    },
    Advisory: {
        path: 'body.advisory',
        href: 'http://example.net/security/'
    },
    product: {
        path: 'body.product.product',
        chart: true,
        pipeline: [
            {
                $unwind: "$body.product"
            }, {
                $sortByCount: "$body.product.product"
            }
        ]
    },
    author: {
        path: 'author',
        hideColumn: true,
    },
    severity: {
        path: 'body.cvss.baseSeverity',
        chart: true,
        hideColumn: true
    },
    Title: {
        path: 'body.TITLE'
    },
    Status: {
        path: 'body.Current-Status',
        bulk: true
    },
    todo: {
        path: { $size : "$body.todo"},
        class: 'bdg'
    },
    owner: {
        path: 'body.owner',
        chart: true,
        bulk: true,
        enum: ["example", "team", "members"],
        class: 'ico '
    },
    rpl: {
        path: 'body.Replication_STATE',
        //hideColumn: true,
        class: 'icn nobr '
    },
    wkd: {
        path: 'body.Workaround_STATE',
        //hideColumn: true
        class: 'icn nobr '
    },
    vfn: {
        path: 'body.Verification_STATE',
        //hideColumn: true
        class: 'icn nobr '
    },
    year: {
        path: 'body.computed.year',
        chart: false,
        hideColumn: true,
        sort: -1
    },
},
schema: {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "required": ["data_type", "ID", "TITLE", "STATE", "data_version", "owner"],
    "properties": {
        "data_type": {
            "type": "string",
            "enum": ["SIR"],
            "options": {
                "hidden": true
            }
        },
        "data_version": {
            "type": "string",
            "enum": ["1.0"],
            "options": {
                "hidden": true
            }
        },
        "ID": {
            "type": "string",
            readonly: true
        },
        "TITLE": {
            "type": "string"
        },
        "Current-Status": {
            "type": "string"
        },
        "STATE": {
            "type": "string",
            "format": "radio",
            "enum": ["new", "open", "waiting", "pending", "closed"],
            "default": "new"
        },
        "TYPE": {
            "type": "string",
            "format": "radio",
            "enum": ["unsure", "no-vuln", "advisory", "no-advisory","doc", "misc", "duplicate"],
            "default": "unsure"
        },
        "keywords": {
            "type": "array",
            format: "taglist",
            "uniqueItems": true,
            items: {
                type: "string"
            }
        },        
        owner: {
            type: "string",
            "format": "radio",
            "$ref": "/users/list/json",
        },
        product: {
            type: "array",
            "uniqueItems": true,
            minItems: 1,
            format: "table",
            items: {
            title: ' ',
                type: "object",
                properties: {
                    "product": {
                        type: 'string',
                        "$ref": "/product/examples/?field=body.product_group"
                    },
                    description: {
                        type: 'string'                        
                    }
                }
            }
        },
        "defect": {
            "Title": "Defect",
            "type": "array",
            format: "taglist",
            "uniqueItems": true,
            items: {
                type: "string"
            },
            "links": [{
                "class": "icn extlink",
                "href": "'https://example.net/defect/' + context.self",
                "title": "context.self",
                "rel": "'Defect'",
                }]
            },
        "CASE": {
            "title": "Case",
            type: "array",
            format: "taglist",
            "uniqueItems": true,
            items: {
                type: "string"
            },
            "links": [{
                "class": "icn extlink",
                "href": "'https://example.net/support/case/' + context.self",
                "title": "context.self",
                "rel": "'Tech Support Case'"
            }]
        },
        "CVE": {
            title: "CVE ID",
            type: "array",
            format: "taglist",
            "uniqueItems": true,
            items: {
                type: "string"
            },
            "links": [{
                   "class": "icn extlink",
                    "href": "'https://nvd.nist.gov/vuln/detail/' + context.self",
                    "title": "context.self",
                    "rel": "'NVD'"
            }],
        },
        "advisory": {
            title: "Advisory-ID",
            type: "array",
            format: "taglist",
            "uniqueItems": true,
            items: {
                type: "string"
            },
            "links": [{
                   "class": "icn extlink",
                    "href": "'https://example.net/' + context.self",
                    "title": "context.self",
                    "rel": "'Advisory'"
            }]
        },
        "Priority": {
            "title": "Priority",
            "type": "string",
            "format": "radio",
            "enum": ["critical", "high", "normal", "low"],
            "default": "normal"
        },
        "Replication_STATE": {
            "title" : "Replication STATE",
            "type": "string",
            "format": "radio",
            "enum": ["new", "open", "waiting", "closed-yes", "closed-no", "not-applicable"],
            "default": "new"
        },
        "Workaround_STATE": {
            "title" : "Workaround STATE",
            "type": "string",
            "format": "radio",
            "enum": ["new", "open", "waiting", "closed-yes", "closed-no", "not-applicable"],
            "default": "new"
        },
        "Verification_STATE": {
            "title" : "Verification STATE",
            "type": "string",
            "format": "radio",
            "enum": ["new", "open", "waiting", "closed-yes", "closed-no", "not-applicable"],
            "default": "new"
        },
        discovery: {
                        type: "radio",
                        "title": "Found during",
                        "enum": ["INTERNAL", "EXTERNAL", "USER", "VENDOR", "UNKNOWN"],
                        "options": {
                            "enum_titles": [
                                "internal research",
                                "external research",
                                "production use",
                                "another vendor advisory",
                                "unknown",
                            ]
                        },
                        default: "UNKNOWN"
                    },
        "reporter": {
            type: "array",
            format: "table",
            items: {
                title: "Reporter",
                type: "string",
                "$ref": "/contact/examples/?field=body.name-org-email"
            }
        },
        "cvss":{
            
     "$ref": "/js/cvss.json"
        },
        "description": {
            "type": "array",
            "format": "table",
            "minItems": 1,
            "items": {
                "title": "Description",
                "type": "string",
                "format": "simplehtml",
"options": {
    "wysiwyg": true
  }
            }
        },
        "references": {
            type: "array",
            format: "table",
                  options: {
                    table_row: true
                },
            items: {
                title: "URL",
                type: "string",
                "maxLength": 500,
                "pattern": "^(ftp|http)s?://\\S+$",
                "message": 'Valid URL is required!',
               "links": [{
                   "class": "icn extlink",
                    "href": "context.self",
                    "title": "context.self",
                    "rel": "'Open link'",
                }],

            }
        },
        todo: {
            title: "Reminders",
            type: "array",
            format: "table",
            items: {
                title: "action item",
                type: "string"
            }
        },

        computed: {
            type: "object",
                readonly: true,
            "options": {
                hidden: true
            },
            properties: {
                'startDate': {
                    type: "string"

                },
                'closeDate': {
                    type: "string",
                    template: '(context.st ? ("closed" == context.st ? (context.self? context.self : new Date().toJSON()): ""):"")',  
                    watch: {
                        st: 'root.STATE'
                    }
                },
                "ym": {
                    type: "string",
                    template: "(context.d ? context.d.substr(0,7) : '')",
                    watch: {
                        "d": "root.computed.startDate"
                    }
                },
                "year": {
                    type: "string",
                    template: "(context.d ? context.d.substr(0,4) : '')",
                    watch: {
                        "d": "root.computed.startDate"
                    }
                },
                "month": {
                    type: "string",
                    template: "(context.d ? context.d.substr(5,2) : '')",
                    watch: {
                        "d": "root.computed.startDate"
                    }
                },
                "closeYM": {
                    type: "string",
                    template: "(context.d ? context.d.substr(0,7) : '')",
                    watch: {
                        "d": "root.computed.closeDate"
                    }
                },
                "closeYear": {
                    type: "string",
                    template: "(context.d ? context.d.substr(0,4) : '')",
                    watch: {
                        "d": "root.computed.closeDate"
                    }
                },
                "closeMonth": {
                    type: "string",
                    template: "(context.d ? context.d.substr(5,2) : '')",
                    watch: {
                        "d": "root.computed.closeDate"
                    }
                }                
            }
        }
    }
},
router: router.post('/new', async function (req, res, next) {
        var result = await db.collection('counters').findOneAndUpdate(
            { _id: 'SIR-'+ (new Date().getFullYear()) },
            { $inc: { seq: 1 } },
            {
                upsert: true,
                returnNewDocument: true
            }
        );
        if(result.value && result.value.seq > 0) {
            req.body.ID = result.value._id + '-'+ String(result.value.seq).padStart(3, '0');
            console.log('Called initialize with' + req.method + '+' + req.path +' = ' + req.body.ID);
            if(!req.body.computed) {
                req.body.computed = {};
            }
            if(!req.body.computed.startDate) {
                var d = new Date().toJSON();
                req.body.computed.startDate = d;
                req.body.computed.ym = d.substr(0,7);
                req.body.computed.year = d.substr(0,4);
                req.body.computed.month = d.substr(5,2);
            }
            next();
        } else {
            res.json({type:'err', msg: 'Error minting a new SIR ID' + JSON.stringify(result)})
        }
    }
)
}