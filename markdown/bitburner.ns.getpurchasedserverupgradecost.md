<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [NS](./bitburner.ns.md) &gt; [getPurchasedServerUpgradeCost](./bitburner.ns.getpurchasedserverupgradecost.md)

## NS.getPurchasedServerUpgradeCost() method

Get cost of upgrading a purchased server to the given ram.

**Signature:**

```typescript
getPurchasedServerUpgradeCost(hostname: string, ram: number): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  hostname | string | Hostname of the server to upgrade. |
|  ram | number | Amount of RAM of the purchased server, in GB. Must be a power of 2 (2, 4, 8, 16, etc.). Maximum value of 1048576 (2^20). |

**Returns:**

number

The price to upgrade.

## Remarks

RAM cost: 0.1 GB

