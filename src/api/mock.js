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
        createdTime: "@now()",
        'replyCount|10-100': 10,
        'likeCount|100-1000': 100,
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
    console.log('total', request.params.total)
    return Mock.mock({
        'code': 200,
        'data': [{
            'id|+1': request.params.total,
            'userId': request.params.userId,
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
            isAuthor: request.params.isAuthor
        }],
        'msg': ''
    })
})