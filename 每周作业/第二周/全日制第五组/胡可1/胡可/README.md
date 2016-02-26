# 胡可第二周作业

***
### 1、JSON是什么？

JSON是前后台数据交互的一种**数据格式**。

### 2、(JSON 和 JavaScript 对象有什么区别？)如何把 JS 对象转化为 JSON 字符串？又如何把 JSON 字符串转化为 JavaScript 对象？

JSON与JS普通对象的区别在于，JSON对象的属性名都被""包裹了起来。属性名加上""就是js对象。

### 3、数组和对象之间的关系是什么？

* 数组也是对象
* 数组是有序对象存储的集合

### 4、call和apply的作用和区别是什么？

* 作用：如果有对象调用了`call`和`apply`，那么调用者中的`this`会被`call`和`apply`参数中的第一个参数替换掉，然后再执行调用者。
* 区别：区别在于后面的参数，`call`中`arguments[0]`后面的参数是零散的，一个个传入调用者；而`apply`中`arguments[0]`后面的参数是一个数组，但也是一个个传入调用者中的。

### 5、eval 的作用是什么?

将字符串转换为js代码。

### 6、alert({})弹出的结果是什么，为什么？

输出`[object Object]`，因为`alert()`输出的是一个字符串，所以会隐式调用`String({})`进行转化，而{}的转化结果是`"[object Object]"`。

### 7、如何严格的判断一个数据是数组（Array）类的实例？

```javascript
console.log(ary instanceof Array); //->ture
console.log(ary.constructor); //->返回构造函数Array()
console.log(Object.prototype.toString.call(ary)); //->[object Array]
```


### 8、说一说 JS 中异常捕获是用什么代码实现的？

```javascript
//上下文
try {
	//这里放置可能产生异常的代码
} catch (e) {
	//这里放置产生异常之后要被执行的代码
}
//如果不手工抛出错误的话，这里的代码会继续执行
```

### 9、用什么方法实现对函数内置的 arguments 对象进行排序？为什么文档集合不能直接借用数组类的 sort 方法进行排序呢？

* 需要借用数组中的`sort()`方法，并使用`apply(null, arguments)`将形参传入；

```javascript
function listToArray (likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    }
```

* 文档集合是HTMLCollection类，不是数组类，而是类数组类，所以无法直接调用数组类中定义的类方法，需要先将文档集合转成数组类才能操作

### 10、请问输出什么结果，为什么

```javascript
function fn1(){alert(1)};function fn2(){alert(2)};
fn3=fn2.call;
fn2.call(fn1);
fn3.call(fn1);
```

弹出2、弹出1；

`fn2.call(fn1);`中的`call`的作用是改变`fn2`中this为`fn1`，而`fn2`中并没有`this`，所以直接执行`fn2`，弹出2；

`fn3.call(fn1);`相当于`fn2.call.call(fn1)`，`call`改变了`fn2.call`中`this`的指向为`fn1`，再执行`fn2.call`，相当于执行了`fn1`，弹出1.