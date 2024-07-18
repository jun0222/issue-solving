### React チートシート

```javascript
let reactCheatSheetData = [
  {
    description: "コンポーネントの作成 (クラスコンポーネント)",
    content: `class MyComponent extends React.Component {
  render() {
    return <div>Hello, World!</div>;
  }
}`,
  },
  {
    description: "コンポーネントの作成 (関数コンポーネント)",
    content: `function MyComponent() {
  return <div>Hello, World!</div>;
}`,
  },
  {
    description: "状態の使用 (クラスコンポーネント)",
    content: `class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}`,
  },
  {
    description: "状態の使用 (関数コンポーネント)",
    content: `function MyComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
  },
  {
    description: "エフェクトの使用",
    content: `function MyComponent() {
  React.useEffect(() => {
    document.title = 'Hello, World!';
  }, []);

  return <div>Hello, World!</div>;
}`,
  },
  {
    description: "プロパティの使用",
    content: `function MyComponent(props) {
  return <div>{props.message}</div>;
}`,
  },
  {
    description: "コンポーネントのマウント/アンマウント時に実行されるコード",
    content: `class MyComponent extends React.Component {
  componentDidMount() {
    console.log('Component mounted');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return <div>Hello, World!</div>;
  }
}`,
  },
  {
    description: "条件付きレンダリング",
    content: `function MyComponent({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back!</p> : <p>Please sign in.</p>}
    </div>
  );
}`,
  },
  {
    description: "リストのレンダリング",
    content: `function MyComponent({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    description: "フォームのハンドリング",
    content: `function MyComponent() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Submitted: ' + value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}`,
  },
];
```

### Next.js チートシート

```javascript
let nextjsCheatSheetData = [
  {
    description: "ページの作成",
    content: `function HomePage() {
  return <div>Welcome to Next.js!</div>;
}

export default HomePage;`,
  },
  {
    description: "リンクの使用",
    content: `import Link from 'next/link';

function HomePage() {
  return (
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

export default HomePage;`,
  },
  {
    description: "動的ルーティング",
    content: `import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <div>Post: {id}</div>;
}

export default Post;`,
  },
  {
    description: "データのフェッチ (getStaticProps)",
    content: `export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function HomePage({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}

export default HomePage;`,
  },
  {
    description: "データのフェッチ (getServerSideProps)",
    content: `export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

function HomePage({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}

export default HomePage;`,
  },
  {
    description: "APIルートの作成",
    content: `export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' });
}`,
  },
  {
    description: "CSSモジュールの使用",
    content: `import styles from './HomePage.module.css';

function HomePage() {
  return <div className={styles.container}>Welcome to Next.js!</div>;
}

export default HomePage;`,
  },
  {
    description: "画像の最適化",
    content: `import Image from 'next/image';

function HomePage() {
  return (
    <div>
      <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
    </div>
  );
}

export default HomePage;`,
  },
  {
    description: "カスタムドキュメント",
    content: `import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;`,
  },
  {
    description: "カスタムAppコンポーネント",
    content: `import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;`,
  },
];
```

### React Native チートシート

```javascript
let reactNativeCheatSheetData = [
  {
    description: "基本的なコンポーネントの作成",
    content: `import React from 'react';
import { Text, View } from 'react-native';

function MyComponent() {
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
}

export default MyComponent;`,
  },
  {
    description: "スタイルの適用",
    content: `import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20,
  },
});

export default MyComponent;`,
  },
  {
    description: "ボタンの使用",
    content: `import React from 'react';
import { Button, View } from 'react-native';

function MyComponent() {
  return (
    <View>
      <Button title="Press me" onPress={() => alert('Button pressed')} />
    </View>
  );
}

export default MyComponent;`,
  },
  {
    description: "テキスト入力の使用",
    content: `import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

function MyComponent() {
  const [text, setText] = useState('');

  return (
    <View>
      <TextInput
        placeholder="Type here"
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

export default MyComponent;`,
  },
  {
    description: "スクロールビューの使用",
    content: `import React from 'react';
import { ScrollView, Text, View } from 'react-native';

function MyComponent() {
  return (
    <ScrollView>
      <Text style={{ fontSize: 96 }}>Scroll me</Text>
      <View style={{ height: 600, backgroundColor: 'blue' }} />
      <Text style={{ fontSize: 96 }}>More scrolling</Text>
    </ScrollView>
  );
}

export default MyComponent;`,
  },
  {
    description: "FlatListの使用",
    content: `import React from 'react';
import { FlatList, Text, View } from 'react-native';

const data = [
  { key: 'Devin' },
  { key: 'Dan' },
 

 { key: 'Dominic' },
  { key: 'Jackson' },
  { key: 'James' },
  { key: 'Joel' },
  { key: 'John' },
  { key: 'Jillian' },
  { key: 'Jimmy' },
  { key: 'Julie' },
];

function MyComponent() {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.key}</Text>}
    />
  );
}

export default MyComponent;`,
  },
  {
    description: "セクションリストの使用",
    content: `import React from 'react';
import { SectionList, Text, View } from 'react-native';

const sections = [
  { title: 'A', data: ['Apple', 'Apricot'] },
  { title: 'B', data: ['Banana', 'Blueberry'] },
];

function MyComponent() {
  return (
    <SectionList
      sections={sections}
      renderItem={({ item }) => <Text>{item}</Text>}
      renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
    />
  );
}

export default MyComponent;`,
  },
  {
    description: "アニメーションの使用",
    content: `import React, { useRef } from 'react';
import { Animated, Button, View } from 'react-native';

function MyComponent() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text>Fading in</Text>
      </Animated.View>
      <Button title="Fade In" onPress={fadeIn} />
    </View>
  );
}

export default MyComponent;`,
  },
  {
    description: "ナビゲーションの使用 (React Navigation)",
    content: `import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  );
}

function DetailsScreen() {
  return <Text>Details Screen</Text>;
}

const Stack = createStackNavigator();

function MyComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyComponent;`,
  },
];
```

### Vue チートシート

```javascript
let vueCheatSheetData = [
  {
    description: "基本的なコンポーネントの作成",
    content: `<template>
  <div>Hello, World!</div>
</template>

<script>
export default {
  name: 'MyComponent'
}
</script>`,
  },
  {
    description: "データの使用",
    content: `<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello, World!'
    }
  }
}
</script>`,
  },
  {
    description: "メソッドの使用",
    content: `<template>
  <div>
    <button @click="sayHello">Click me</button>
  </div>
</template>

<script>
export default {
  methods: {
    sayHello() {
      alert('Hello!')
    }
  }
}
</script>`,
  },
  {
    description: "コンポーネントのプロパティの使用",
    content: `<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  props: {
    message: String
  }
}
</script>`,
  },
  {
    description: "条件付きレンダリング",
    content: `<template>
  <div>
    <p v-if="isLoggedIn">Welcome back!</p>
    <p v-else>Please sign in.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false
    }
  }
}
</script>`,
  },
  {
    description: "リストのレンダリング",
    content: `<template>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ]
    }
  }
}
</script>`,
  },
  {
    description: "イベントハンドリング",
    content: `<template>
  <div>
    <input v-model="message" @input="handleInput" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    handleInput(event) {
      console.log(event.target.value)
    }
  }
}
</script>`,
  },
  {
    description: "ライフサイクルフックの使用",
    content: `<script>
export default {
  created() {
    console.log('Component created')
  },
  mounted() {
    console.log('Component mounted')
  },
  destroyed() {
    console.log('Component destroyed')
  }
}
</script>`,
  },
  {
    description: "カスタムディレクティブの作成",
    content: `<template>
  <div v-color="'red'">This should be red</div>
</template>

<script>
export default {
  directives: {
    color: {
      bind(el, binding) {
        el.style.color = binding.value
      }
    }
  }
}
</script>`,
  },
  {
    description: "Vue Routerの使用",
    content: `import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})`,
  },
];
```

### Nuxt.js チートシート

```javascript
let nuxtCheatSheetData = [
  {
    description: "ページの作成",
    content: `<template>
  <div>Welcome to Nuxt.js!</div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>`,
  },
  {
    description: "動的ルーティング",
    content: `<template>
  <div>Post: {{ $route.params.id }}</div>
</template>

<script>
export default {
  name: 'PostPage'
}
</script>`,
  },
  {
    description: "データのフェッチ (asyncData)",
    content: `<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  async asyncData() {
    const res = await fetch('https://api.example.com/data')
    const data = await res.json()
    return { data }
  }
}
</script>`,
  },
  {
    description: "データのフェッチ (fetch)",
    content: `<template>
  <div>{{ data }}</div>
</template>

<script>
export default {
  data() {
    return {
      data: null
    }
  },
  async fetch() {
    const res = await fetch('https://api.example.com/data')
    this.data = await res.json()
  }
}
</script>`,
  },
  {
    description: "プラグインの使用",
    content: `// plugins/axios.js
import axios from 'axios'

export default ({ app }, inject) => {
  const api = axios.create({
    baseURL: 'https://api.example.com'
  })

  inject('api', api)
}

// nuxt.config.js
export default {
  plugins: ['~/plugins/axios.js']
}

// 使用例
export default {
  async asyncData({ $api }) {
    const { data } = await $api.get('/data')
    return { data }
  }
}`,
  },
  {
    description: "レイアウトの使用",
    content: `<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>`,
  },
  {
    description: "ミドルウェアの使用",
    content: `// middleware/auth.js
export default function ({ store, redirect }) {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

// 使用例
export default {
  middleware: 'auth'
}`,
  },
  {
    description: "ストアの設定",
    content: `// store/index.js
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment(state) {
    state.counter++
  }
}

// 使用例
export default {
  methods: {
    increment() {
      this.$store.commit('

increment')
    }
  }
}`,
  },
  {
    description: "エラーページのカスタマイズ",
    content: `<template>
  <div>
    <h1>Error {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>`,
  },
  {
    description: "静的サイトの生成",
    content: `// nuxt.config.js
export default {
  target: 'static'
}

// コマンド
// nuxt generate`,
  },
];
```

### Express チートシート

```javascript
let expressCheatSheetData = [
  {
    description: "基本的なサーバーの作成",
    content: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});`,
  },
  {
    description: "ルーティング",
    content: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000);`,
  },
  {
    description: "ミドルウェアの使用",
    content: `const express = require('express');
const app = express();

const myMiddleware = (req, res, next) => {
  console.log('Middleware executed');
  next();
};

app.use(myMiddleware);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000);`,
  },
  {
    description: "静的ファイルの提供",
    content: `const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3000);`,
  },
  {
    description: "JSONボディの解析",
    content: `const express = require('express');
const app = express();

app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});

app.listen(3000);`,
  },
  {
    description: "URLエンコードされたボディの解析",
    content: `const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});

app.listen(3000);`,
  },
  {
    description: "エラーハンドリング",
    content: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  throw new Error('Something went wrong');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000);`,
  },
  {
    description: "ルーターの使用",
    content: `const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Home Page');
});

router.get('/about', (req, res) => {
  res.send('About Page');
});

app.use('/', router);

app.listen(3000);`,
  },
  {
    description: "クッキーの使用",
    content: `const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

app.get('/setcookie', (req, res) => {
  res.cookie('mycookie', 'cookievalue');
  res.send('Cookie is set');
});

app.get('/getcookie', (req, res) => {
  res.send(req.cookies);
});

app.listen(3000);`,
  },
  {
    description: "セッションの使用",
    content: `const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));

app.get('/setsession', (req, res) => {
  req.session.username = 'John Doe';
  res.send('Session is set');
});

app.get('/getsession', (req, res) => {
  res.send(req.session);
});

app.listen(3000);`,
  },
];
```

### Node.js チートシート

```javascript
let nodejsCheatSheetData = [
  {
    description: "基本的なサーバーの作成 (http)",
    content: `const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
  },
  {
    description: "ファイルの読み込み (fs)",
    content: `const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});`,
  },
  {
    description: "ファイルの書き込み (fs)",
    content: `const fs = require('fs');

const data = 'Hello, World!';

fs.writeFile('example.txt', data, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been written');
});`,
  },
  {
    description: "ファイルの非同期読み込み (fs/promises)",
    content: `const fs = require('fs/promises');

async function readFile() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFile();`,
  },
  {
    description: "モジュールの作成とエクスポート",
    content: `// module.js
function greet(name) {
  return \`Hello, \${name}!\`;
}

module.exports = greet;

// main.js
const greet = require('./module');

console.log(greet('World'));`,
  },
  {
    description: "イベントの使用 (events)",
    content: `const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('event', () => {
  console.log('An event occurred!');
});

emitter.emit('event');`,
  },
  {
    description: "ストリームの使用 (読み取り)",
    content: `const fs = require('fs');

const readStream = fs.createReadStream('example.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('end', () => {
  console.log('No more data');
});`,
  },
  {
    description: "ストリームの使用 (書き込み)",
    content: `const fs = require('fs');

const writeStream = fs.createWriteStream('example.txt');

writeStream.write('Hello, ');
writeStream.write('World!');
writeStream.end();

writeStream.on('finish', () => {
  console.log('Write completed');
});`,
  },
  {
    description: "HTTPリクエスト (http)",
    content: `const http = require('http');

const options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error(\`Problem with request: \${e.message}\`);
});

req.end();`,
  },
  {
    description: "HTTPリクエスト (axios)",
    content: `const axios = require('axios');

axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
  },
];
```

### AWS CLI チートシート

```javascript
let awscliCheatSheetData = [
  {
    description: "AWS CLI のバージョン確認",
    content: "aws --version",
  },
  {
    description: "設定の構成",
    content: "aws configure",
  },
  {
    description: "S3 バケットの作成",
    content: "aws s3 mb s3://my-bucket",
  },
  {
    description: "S3 バケットにファイルをアップロード",
    content: "aws s3 cp myfile.txt s3://my-bucket/",
  },
  {
    description: "S3 バケットからファイルをダウンロード",
    content: "aws s3 cp s3://my-bucket/myfile.txt .",
  },
  {
    description: "S3 バケットの内容を一覧表示",
    content: "aws s3 ls s3://my-bucket/",
  },
  {
    description: "

EC2 インスタンスの開始",
    content: "aws ec2 start-instances --instance-ids i-1234567890abcdef0",
  },
  {
    description: "EC2 インスタンスの停止",
    content: "aws ec2 stop-instances --instance-ids i-1234567890abcdef0",
  },
  {
    description: "EC2 インスタンスの状態を表示",
    content: "aws ec2 describe-instances --instance-ids i-1234567890abcdef0",
  },
  {
    description: "IAM ユーザーの作成",
    content: "aws iam create-user --user-name myuser",
  },
  {
    description: "IAM グループの作成",
    content: "aws iam create-group --group-name mygroup",
  },
  {
    description: "IAM ユーザーをグループに追加",
    content: "aws iam add-user-to-group --user-name myuser --group-name mygroup",
  },
  {
    description: "Lambda 関数のデプロイ",
    content: "aws lambda create-function --function-name myfunction --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role arn:aws:iam::123456789012:role/execution_role",
  },
  {
    description: "CloudFormation スタックの作成",
    content: "aws cloudformation create-stack --stack-name mystack --template-body file://template.yaml",
  },
  {
    description: "CloudFormation スタックの削除",
    content: "aws cloudformation delete-stack --stack-name mystack",
  },
  {
    description: "DynamoDB テーブルの作成",
    content: "aws dynamodb create-table --table-name mytable --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5",
  },
  {
    description: "DynamoDB テーブルにアイテムを追加",
    content: "aws dynamodb put-item --table-name mytable --item '{\"id\": {\"S\": \"123\"}, \"name\": {\"S\": \"John\"}}'",
  },
  {
    description: "DynamoDB テーブルからアイテムを取得",
    content: "aws dynamodb get-item --table-name mytable --key '{\"id\": {\"S\": \"123\"}}'",
  },
  {
    description: "DynamoDB テーブルの内容をスキャン",
    content: "aws dynamodb scan --table-name mytable",
  },
];
```

### AWK チートシート

```javascript
let awkCheatSheetData = [
  {
    description: "基本的なAWKコマンド",
    content: `awk '{ print }' filename`,
  },
  {
    description: "特定の列を表示",
    content: `awk '{ print $1, $3 }' filename`,
  },
  {
    description: "パターンに一致する行を表示",
    content: `awk '/pattern/ { print }' filename`,
  },
  {
    description: "フィールド区切り文字を指定",
    content: `awk -F, '{ print $1, $3 }' filename`,
  },
  {
    description: "特定の条件に一致する行を表示",
    content: `awk '$2 > 100 { print }' filename`,
  },
  {
    description: "行番号を表示",
    content: `awk '{ print NR, $0 }' filename`,
  },
  {
    description: "合計を計算",
    content: `awk '{ sum += $1 } END { print sum }' filename`,
  },
  {
    description: "平均を計算",
    content: `awk '{ sum += $1; count++ } END { print sum / count }' filename`,
  },
  {
    description: "列の名前を指定",
    content: `awk '{ print "Name:", $1, "Score:", $2 }' filename`,
  },
  {
    description: "列の値を変更",
    content: `awk '{ $2 = $2 * 2; print }' filename`,
  },
  {
    description: "出力をファイルにリダイレクト",
    content: `awk '{ print $1, $2 }' filename > output.txt`,
  },
  {
    description: "複数のファイルを処理",
    content: `awk '{ print FILENAME, $0 }' file1 file2`,
  },
  {
    description: "行をスキップ",
    content: `awk 'NR > 1 { print }' filename`,
  },
  {
    description: "正規表現を使用",
    content: `awk '/^A/ { print }' filename`,
  },
  {
    description: "列の名前を変更",
    content: `awk '{ $1 = "NewName"; print }' filename`,
  },
];
```

### SED チートシート

```javascript
let sedCheatSheetData = [
  {
    description: "基本的なSEDコマンド",
    content: `sed 's/original/replacement/' filename`,
  },
  {
    description: "ファイル内の全ての一致する箇所を置換",
    content: `sed 's/original/replacement/g' filename`,
  },
  {
    description: "ファイル内の特定の行を置換",
    content: `sed '3s/original/replacement/' filename`,
  },
  {
    description: "ファイル内の特定の範囲を置換",
    content: `sed '3,5s/original/replacement/' filename`,
  },
  {
    description: "ファイル内の複数のパターンを置換",
    content: `sed -e 's/pattern1/replacement1/' -e 's/pattern2/replacement2/' filename`,
  },
  {
    description: "ファイル内の行を削除",
    content: `sed '3d' filename`,
  },
  {
    description: "ファイル内の特定の範囲の行を削除",
    content: `sed '3,5d' filename`,
  },
  {
    description: "ファイル内の行を挿入",
    content: `sed '3i\new line of text' filename`,
  },
  {
    description: "ファイル内の行を追加",
    content: `sed '3a\new line of text' filename`,
  },
  {
    description: "ファイル内の行を変更",
    content: `sed '3c\new line of text' filename`,
  },
  {
    description: "ファイル内の空行を削除",
    content: `sed '/^$/d' filename`,
  },
  {
    description: "ファイル内のコメント行を削除",
    content: `sed '/^#/d' filename`,
  },
  {
    description: "ファイル内のパターンに一致する行を削除",
    content: `sed '/pattern/d' filename`,
  },
  {
    description: "出力をファイルにリダイレクト",
    content: `sed 's/original/replacement/' filename > output.txt`,
  },
  {
    description: "元のファイルを上書き",
    content: `sed -i 's/original/replacement/' filename`,
  },
];
```

これらのチートシートデータは、React、Next.js、React Native、Vue、Nuxt.js、Express、Node.js、AWS CLI、AWK、および SED でよく使われるコマンドやスニペットを含んでいます。各環境でスクリプトやコマンドを簡単に参照できるようになります。

### Excel チートシート

```javascript
let excelCheatSheetData = [
  {
    description: "基本的なExcelコマンド",
    content: `=SUM(A1:B1)`,
  },
];
```

この階層で各チートシートへのリンクの html ほしい。

- [git チートシート](https://tools.juns-app.com/cheat/git)
- [docker チートシート](https://tools.juns-app.com/cheat/docker)
- [vscode チートシート](https://tools.juns-app.com/cheat/vscode)
- [kubernetes チートシート](https://tools.juns-app.com/cheat/kubernetes)
