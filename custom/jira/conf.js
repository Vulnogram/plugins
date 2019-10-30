const dutil = require('../sir/dutil.js');
module.exports = {
conf: {
    title: 'JIRA Issues',
    readonly: true,
    name: 'JIRA',
    class: 'icn Defect',
    order: 1.1,
    uri: '/jira/',
    lookup: [
        {   $lookup: {
                    from: 'sirs',
                    localField: 'key',
                    foreignField: 'body.defect',
                    as: 'SIRs',
                }
        }
    ]
},
facet: {
    ID: {
        path: 'key',
        regex: '[A-Z]+-[0-9]+',
        idpath: true,
        href: 'https://example.atlassian.net/browse/'
    },
    IR: {
        type: [String,null],
        path: 'SIRs.body.ID',
        href: '/sir/'
    },
    date: {
        path: 'fields.Created',
        sortDefault: '-date'
    },
    CVE: {
        path: 'fields.CVE-Id',
        href: 'https://nvd.nist.gov/vuln/detail/',
        showDistinct: true
    },
    vuln: {
        path: 'fields.Security Vulnerability.value',
        class: 'icn '
    },
    state: {
        path: 'SIRs.body.STATE',
        class: 'icn nobr ',
        chart: true
    },    
    type: {
        path: 'SIRs.body.TYPE',
        class: 'icn nobr ',
        chart: true
    },
    issueState: {
        path: 'fields.Status.name',
        tabs: true,
        sort: 1,
        class: 'icn nobr '
        
    },
 /*   substate: {
        path: 'fields.Status.statusCategory.name',
        sort: 1,
        class: 'icn nobr '
    },*/
    Fix: {
      path: 'fields.Fix versions.name',
    },
    Priority: {
        path: 'fields.Priority.name',
        class: 'icn ',
        //chart: true
    },
    CVSS: {
        path: 'SIRs.body.cvss.baseScore',
        type: Number
    },
    severity: {
        type: [String],
        path: 'SIRs.body.cvss.baseSeverity',
        chart: true,
        hideColumn: true,
        sort: +1
    },
    due: {
        path: 'fields.Due date'
    },
    Advisory: {
        path: 'SIRs.body.advisory',
        href: 'https://kb.juniper.net/'
    },
    product: {
        path: 'fields.Project.name',
        chart: true
    },
    labels: {
        path: 'fields.Labels',
        //chart: true
    },
    Synopsis: {
        path: 'fields.Summary',
        href: '/jira/',
        xref:{
            href: 'ID'
        }
    },
    year: {
        path: 'year',
        type: [Number],
        chart: true,
        hideColumn: true,
        sort: -1,
    },
    owner: {
        type: [String],
        path: 'SIRs.body.owner',
        chart: true,
        class: 'ico '
    },
}
}