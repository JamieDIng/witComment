import Mock from 'mockjs';



//评论列表
Mock.mock('/comments', { //输出数据
    'code': 200,
    'data|100': [{
        'id|+1': 1,
        'userId|+1': 1,
        userName: "@cname",
        'avatar|1': [
            require(`@/assets/avatar0.jpg`),
            require(`@/assets/avatar1.jpg`),
            require(`@/assets/avatar2.jpg`),
            require(`@/assets/avatar3.jpg`),
            require(`@/assets/avatar4.jpg`),
            require(`@/assets/avatar5.jpg`)
        ],
        content: "[:-o][:-|][:-(][:neutral:][表情]@cparagraph(1, 4)",
        summaryText: '',
        createdTime: "1638779844",
        'replyCount|10-100': 10,
        'likeCount': 0,
        "isLiked|1": false, //是否喜欢
        'canDelete|1': true, //是否有权删除

        //最后三条回复
        'lastThreeComments|0-5': [{
            'id|+1': 143460, //这条回复的ID
            "userId": 2, //这条回复的作者
            "replyPostId": 143459, //被回复回复ID
            "replyUserId": 21404, // 被回复用户
            "commentPostId": null, // 回复中回复的ID
            "commentUserId": null, //  回复中回复用户ID
            "summaryText": "@cparagraph(1, 4)",
            "content": "@cparagraph(1, 4)",
            "parseContentHtml": "@cparagraph(1, 4)",
            'replyCount|1-10': 1,
            'likeCount|2-20': 2,
            "createdAt": "@now()", //回复时间
            "updatedAt": "@now()", //修改时间
            "isLiked|1": false, //是否喜欢 模拟已经点赞
            'canDelete|1': true, //是否有权删除
            //	发表用户
            "user": {
                'userId|+1': 1,
                userName: "@cname",
                'avatar|1': [
                    require(`@/assets/avatar0.jpg`),
                    require(`@/assets/avatar1.jpg`),
                    require(`@/assets/avatar2.jpg`),
                    require(`@/assets/avatar3.jpg`),
                    require(`@/assets/avatar4.jpg`),
                    require(`@/assets/avatar5.jpg`)
                ],
            },
            //所回复的用户
            "replyUser": {
                'userId': 2,
                userName: "@cname",
                'avatar|1': [
                    require(`@/assets/avatar0.jpg`),
                    require(`@/assets/avatar1.jpg`),
                    require(`@/assets/avatar2.jpg`),
                    require(`@/assets/avatar3.jpg`),
                    require(`@/assets/avatar4.jpg`),
                    require(`@/assets/avatar5.jpg`)
                ],
            },
            // 楼中楼关联的用户信息
            "commentUser": null,
            // "commentUser": {
            // 'userId|+1': 1,
            // userName: "@cname",
            // 'avatar|1': [
            //     require(`@/assets/avatar0.jpg`),
            //     require(`@/assets/avatar1.jpg`),
            //     require(`@/assets/avatar2.jpg`),
            //     require(`@/assets/avatar3.jpg`),
            //     require(`@/assets/avatar4.jpg`),
            //     require(`@/assets/avatar5.jpg`)
            // ],
            // }
        }]
    }],
    'msg': ''
});

let mockUserInfo = [{
        "code": 0,
        "data": {
            "fullName0": "@CNAME", // 随机生成中文人名
            "userId0": 1000234234001,
        }
    },
    {
        "code": 0,
        "data": {
            "fullName1": "@CNAME", // 随机生成中文人名
            "userId1": 1000234234001,
        }
    },
    {
        "code": 0,
        "data": {
            "fullName2": "@CNAME", // 随机生成中文人名
            "userId2": 1000234234001,
        }
    }
];

//表情列表
Mock.mock(RegExp('/smile.*'), (options) => {
    let _page = JSON.parse(options.body);
    console.debug('测试', _page._page);
    return Mock.mock(mockUserInfo[_page._page - 1]);
})

//模拟回复
Mock.mock(RegExp('/reply'), (option) => {
    let request = JSON.parse(option.body)
        // console.log('total', request.params)
    return Mock.mock({
        'code': 200,
        'data': [{
            'id|+1': 10000,
            'userId': request.params.userId,
            "replyPostId": request.params.replyPostId,
            userName: request.params.userName,
            'avatar|1': [
                require(`@/assets/avatar0.jpg`),
                require(`@/assets/avatar1.jpg`),
                require(`@/assets/avatar2.jpg`),
                require(`@/assets/avatar3.jpg`),
                require(`@/assets/avatar4.jpg`),
                require(`@/assets/avatar5.jpg`)
            ],
            content: request.params.message + "(审核中)",
            createdTime: "@now()",
            'replyCount|10-100': 10,
            'likeCount|100-1000': 100,
            isAuthor: request.params.isAuthor,
            lastThreeComments: [],
            //	发表用户
            "user": {
                'userId|+1': 1,
                userName: "@cname",
                'avatar|1': [
                    require(`@/assets/avatar0.jpg`),
                    require(`@/assets/avatar1.jpg`),
                    require(`@/assets/avatar2.jpg`),
                    require(`@/assets/avatar3.jpg`),
                    require(`@/assets/avatar4.jpg`),
                    require(`@/assets/avatar5.jpg`)
                ],
            },
            //所回复的用户
            "replyUser": {
                'userId|+1': 1,
                userName: "@cname",
                'avatar|1': [
                    require(`@/assets/avatar0.jpg`),
                    require(`@/assets/avatar1.jpg`),
                    require(`@/assets/avatar2.jpg`),
                    require(`@/assets/avatar3.jpg`),
                    require(`@/assets/avatar4.jpg`),
                    require(`@/assets/avatar5.jpg`)
                ],
            },
        }],
        'msg': ''
    })
})