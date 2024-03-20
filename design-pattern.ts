// https://blog.csdn.net/qq_41311259/article/details/119254280
/**
 * 装饰器模式
*/
// 装饰器，在当前函数执行前先执行另一个函数
function decoratorBefore(fn, beforeFn) {
    return function() {
        var ret = beforeFn.apply(this, arguments);

        // 在前一个函数中判断，不需要执行当前函数
        if (ret !== false) {
            fn.apply(this, arguments);
        }
    };
}


function skill() {
    console.log('数学');
}

function skillMusic() {
    console.log('音乐');
}

function skillRun() {
    console.log('跑步');
}

var skillDecorator = decoratorBefore(skill, skillMusic);
skillDecorator = decoratorBefore(skillDecorator, skillRun);

skillDecorator(); // 跑步 音乐 数学
