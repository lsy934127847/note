
# 技术栈 React.PurComponent  shouldComponentUpdate  memo useCallback useMemo

问题: 当在父组件使用了子组件,父组件的数据发生变化,会导致子组件也会被重新渲染,引发性能问题
目的: 阻止子组件的重复渲染
总结: 1.在不给子组件传递数据时,使用memo高阶组件阻止了子组件重新渲染

      2.a、在给子组件传递的数据时候,由于传递的数据可能会发生改变,导致子组件重新渲染,使用useCallback和useMemo阻止
        b、使用useCallback和useMemo根本原理就是让传递的数据没有发生改变,尤其在传递复杂数据类型时

      3. 在类组件可以用shouldComponentUpdate 完美解决该性能问题,只需进行一个新旧值的判断,便可决定是否要继续渲染
      4. 在类组件中可以让子组件继承 React.PurComponent 类阻止子组件重新渲染,但当给子组件传递数据时和memo的情况一样
      5. 何种情况下会使组件重新渲染
          a. 类组件中通过setState方法触发
          b. 函数式组件中,通过hooks解构出来的方法触发
          c. 在传递给子组件的数据发生改变时触发
          d. ...redux
      6.  在触发组件重新渲染时,都赋予了组件状态(state)一个新值,无论是基本数据类型,还是复杂数据类型
      7.  在组件中,组件的状态(state)和(props) 尤为重要

# 场景(一)
 在不给子组件传递任何数据的情况下,使用memo阻止子组件渲染, 类组件中可以使用React.PurComponent或者shouldComponentUpdate
```javascript
 var Father = () => {
        console.log("Father被渲染了")
        var [age, setAge] = React.useState(20)
        return (
            <div>
                <p>我是Father组件</p>
                <button onClick={() => { setAge(age + 2) }}>Father按钮</button>
                <MemoSon />  
            </div>
        )
    }
    var Son = () => {
        console.log("Son被渲染了")
        return (
            <div>
                <p>我是Sonr组件</p>
            </div>
        )
    }

var MemoSon = React.memo(Son)  // memo高阶组件,传入一个组件,返回一个新组件
```
# 场景(二)
在给子组件传递数据的情况下,子组件通过props接受,若传递的数据发生了变化,子组件会再次渲染
此时就应注意传递的是何种数据类型的数据,数据有没有发生变化,注意复杂数据类型
```javascript
 var Father = () => {
        console.log("Father被渲染了")
        var [age, setAge] = React.useState(20)
         var [num, setNum] = React.useState(20)
        return (
            <div>
                <p>我是Father组件</p>
                <button onClick={() => { setAge(age + 2) }}>Father按钮</button>
                <MemoSon name={{myage:10}}/>   //  点击按钮父组件渲染,name值为复杂数据类型,name发生变化,子组件渲染
                <MemoSon name={age}/>          //  点击按钮age 发生变化,子组件渲染
                <MemoSon name={num}/>          //  点击按钮,age 发生变化,父组件渲染,num没有发生变化,及name没有发生变化,子组件不会渲染
            </div>
        )
    }
    var Son = (props) => {
        console.log("Son被渲染了")
        return (
            <div>
                <p>我是Sonr组件</p>
            </div>
        )
    }

var MemoSon = React.memo(Son)  // memo高阶组件,传入一个组件,返回一个新组件

```
# 场景(三)
在传递数据时,由于传递的数据发生了改变,导致子组件重新渲染,为阻止子组件重新渲染,使用useCallback和useMemo
```javascript

var Father = () => {
        console.log("Father被渲染了")
        var [age, setAge] = React.useState(20)
        var [num, setNum] = React.useState(20)
        var [count, setCount] = React.useState({})
        
        var memoRes = React.useMemo(
            () =>{
                return {myage:10}
            },
            [num]   // 只有当num变量发生变化时,第一个参数回调才会执行,返回 return 返回的内容给memoRes
                    // 当num没有发生变化,则memoRes指向的地址不会变化,
        )

            var callBackFn = React.useCallback(
                () =>{
                   // do something
                },
            [num]     // 只有当num发生变化的时候,才会返回一块新的函数地址给到callBackFn,函数地址指向,第一个传入函数参数
                    
        )

      //  useCallback和useMemo的区别  useCallback只能返回函数 useMemo可以返回return 的内容

        return (
            <div>
                <p>我是Father组件</p>
                <button onClick={() => { setAge(age + 2) }}>Father按钮</button>
                <MemoSon name={memoRes}/>      //  点击按钮父组件渲染,name值为复杂数据类型,
                                               //   useMemo中num没有发生变化,则memoRes指向的地址不变,即name不变,阻止了子组件渲染
                <MemoSon name={age}/>          //  点击按钮age 发生变化,子组件渲染

                <MemoSon name={callBackFn}/>   //  点击按钮age 发生变化
                                               //  由于useCallback中num没有发生变化，
                                               //  返回第一个回调函数参数 给callBackFn 永远是 同一个函数地址.
                                               //  则callBackFn指向的地址不变,即name不变,阻止了子组件渲染
            </div>
        )
    }
    var Son = (props) => {
        console.log("Son被渲染了")
        return (
            <div>
                <p>我是Sonr组件</p>
            </div>
        )
    }

var MemoSon = React.memo(Son)  // memo高阶组件,传入一个组件,返回一个新组件
```