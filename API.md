## Home page

### GetGuessThemes

#### Response

```json
[
  {
    name: string,
    createTime: number,
    prediction: boolean,  # Prediction of top handicap
    odd: number,
    pool: number,
    participants: number,
    address: string,
  },
] 
```

### JoinHandicap

#### Request

```json
{
    amount: number.
}
```

### JoinAsBanker

#### Request

```json

{
    prediction: boolean,
    odd: number,
    pool: number,
}
```

#### Response

```json
{
    success: boolean
}
```

## CreateGuessTheme Page

### CreateGuessTheme

#### Request

```json

  {
    name: string,
    createTime: number,  # Given by interface or generate in contract?
    prediction: boolean,
    odd: number,
    pool: number,
  }

```

## MyMets Page

#### Request

```json
[
  {
    name: string,
    createTime: number,
    joinTime: number,
    prediction: number,  # Prediction of top handicap, 0 or 1
    odd: number,
    pool: number,
    participants: number,
    address: string,
    betAmount: number,
    result: number,       # 0: Lose, 1: Win, -1: Ongoing
  },
]

```
