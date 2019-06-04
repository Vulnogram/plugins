module.exports = {
conf: {
    title: 'Email',
    readonly: true,
    name: 'Email',
    class: 'icn Email'    
},
facet: {
     reply: {
        path: 'isReply',
        class: 'ico',
      //  chart: true,
         type: 'Boolean'
    },
    atch: {
        path: {$size: "$attachments"},
        class: "ico Attachments"
    },
    ID: {
        path: '_id',
        regex: '[a-zA-Z0-9\-]+',
        class: 'hid',
        idpath: true
    },
    from: {
        path: 'from.text',
        href: '?from='
    },
    subject: {
        path: 'subject',
        href: '/mail/',
        class: 'sgl w100',
        xref: {
            href: 'ID'   
        }
    },
    date: {
        path: 'createdAt',
        sortDefault: '-date'
    },
    to: {
        path: 'to.value.address',
        pipeline: [
            {
                $unwind: "$to.value.name"
            }
        ],
        href: '?to=',
        hideColumn: true
    },
    year: {
        path: 'year',
        type: Number,
        //chart: true,
        hideColumn: true,
    }
}
}