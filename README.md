# Getting Started with Create React App

## 執行專案步驟
在根目錄下依序執行下列 command
### Step 1. 在 node v14.15.4 下執行 `yarn build`
請先打包壓縮

### Step 2. `yarn global add serve`
### Step 3. `serve -s build`
此二步驟在本機端開啟服務，在瀏覽器輸入終端機提示的網址 (http://localhost:xxxx)

## 專案的架構、Web 的架構邏輯
此專案使用 [Create React App](https://github.com/facebook/create-react-app) 為基底來開發.
- node version: v14.15.4

架構邏輯
- public - 放置靜態入口 index.html、fav icon
- src - 放置所有 js、css、React 元件
  - container: 放置頁面，並在此層去拉資料
  - component: 放置其他的元件，必須時會去拉資料（ex. HeroProfile）
  - share: 放置全站有可能會共用的 constant（例如：Color, Hero Abilities）
  - style: 放置全站性的 style 設定（例如：字型、keyframes）
  - 入口為 index.js：引入所需 css 及使用 react 建立所有的 DOM 及 js


## 對於所有使用到的第三方 library 的理解，以及他們的功能簡介
### 1. react-router-dom
供網頁版 React 在 App 渲染時建立動態路由，並 mapping 路由去顯示對應的元件。
其中在此專案中有使用到：
- <BrowserRouter>: 讓底下所有的元件都能使用 router。
- <Switch>: 會讓底下第一個吻合 Route 條件中的元件渲染。
- <Route>: 在不同的 Route 之下，可放入對應想顯示的元件。
- <NavLink>: 除了與 Link 一樣有連結到其他頁面的功能，更提供 navigation 顯示 active class、style 之功能。
- <Redirect>: 依照參數，將頁面重新至其他頁面
- Hooks:
  - useParams: 可在 function 中取得路由 params。

### 2. styled-component
CSS-in-JS，供 css 可以與 data 透過 js 的方式有高度的彈性js。
可以將 property 傳入是先定義好的 ```styled-component```，並做對應的操作。

## 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解
大部分時間不太會去寫註解，會盡量透過命名方式讓程式碼較容易閱讀。
但若是遇到有部分功能寫到一半，必須在未來補齊，或是讓其他人接手時，就會寫上 ```// TODO:```、```// FIX:``` 的註解。
此註解搭配 VSCode 裡的 TODO Tree plugin，可以讓未來在搜尋這些重要的代辦清單時會更容易！

## 在這份專案中你遇到的困難、問題，以及解決的方法
在這份專案中第一次使用 styled-component 寫 CSS-IN-JS（過去是使用 ```radium```），過程中發現畫面運作不如預期：
- Hover style 跟 傳入 props（disabled）優先權問題，造成 disabled 效果被 hover 吃掉：
  - 原本的寫法
    ```
    const SubmitButton = styled.button`
      cursor: ${props => props.disabled ? 'normal' : 'pointer' };
      opacity: ${props => props.disabled ? 0.6 : 1 };
      transition: opacity .3s ease, background .12s ease;
      &:hover {
        opacity: .9;
        background: #b2b2b2;
      }
    `;
    ```
  - 後來想到既然他不要被 hover 就不會影響 disabled 需要的效果，因此加入 ```pointer-events: none;```
    ```
    const SubmitButton = styled.button`
      pointer-events: ${props => props.disabled ? 'none' : 'auto'};
      cursor: ${props => props.disabled ? 'normal' : 'pointer' };
      opacity: ${props => props.disabled ? 0.6 : 1 };
      transition: opacity .3s ease, background .12s ease;
      &:hover {
        opacity: .9;
        background: #b2b2b2;
      }
    `;
    ```
