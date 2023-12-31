<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [TIX](./bitburner.tix.md) &gt; [buyStock](./bitburner.tix.buystock.md)

## TIX.buyStock() method

Buy stocks.

**Signature:**

```typescript
buyStock(sym: string, shares: number): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  sym | string | Stock symbol. |
|  shares | number | Number of shares to purchased. Must be positive. Will be rounded to nearest integer. |

**Returns:**

number

The stock price at which each share was purchased, otherwise 0 if the shares weren't purchased.

## Remarks

RAM cost: 2.5 GB Attempts to purchase shares of a stock using a Market Order.

If the player does not have enough money to purchase the specified number of shares, then no shares will be purchased. Remember that every transaction on the stock exchange costs a certain commission fee.

If this function successfully purchases the shares, it will return the stock price at which each share was purchased. Otherwise, it will return 0.

