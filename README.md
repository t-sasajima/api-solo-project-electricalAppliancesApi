電化製品に関する情報を登録、取得できるAPIです。
登録した家電製品にコメントを追加することもできます。


# セットアップ
## インストール要件
 - node.js バージョンxxx

## インストール方法
```
git clone https://github.com/t-sasajima/api-solo-project-electricalAppliancesApi.git
```

# APIガイド
## 電化製品
### 一覧取得
#### Request
```
GET /electricalAppliances
```

#### Responses
```
[appliance, ...]

appliance = {
    id: integer  //ID
    name: string //製品名
    maker: string //メーカー
    price: integer //値段
    category: string //電化製品のカテゴリー
    comments: [comment, ...] //登録されたコメントの一覧
}
comment = {
    username: string //投稿した人の名前
    text: string //コメント内容
}
```

### 特定の製品情報を取得
#### Request
```
GET /electricalAppliances/{id}
```

#### Responses
```
[appliance]
```

### 製品登録
#### Request
```
POST /electricalAppliances
```
### Request Body(application/json)
```
{
    name: string //製品名
    maker: string //メーカー
    price: integer //値段
    category: string //電化製品のカテゴリー
}
```

#### Responses
```
登録された製品情報の配列
[appliance]
```

### 製品登録情報の変更
#### Request
```
PUT /electricalAppliances/{id}
```
### Request Body(application/json)
```
変更したい内容をJSON形式で送信
{
    price: integer //値段
}
```

#### Responses
```
変更後の製品情報の配列
[appliance]
```

### 製品の削除
#### Request
```
DELETE /electricalAppliances/{id}
```
#### Responses
```
削除した製品情報の配列
[appliance]
```

/// TODO
- コメントの追加削除