<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [GangFormulas](./bitburner.gangformulas.md) &gt; [moneyGain](./bitburner.gangformulas.moneygain.md)

## GangFormulas.moneyGain() method

Calculate money gain per tick.

**Signature:**

```typescript
moneyGain(gang: GangGenInfo, member: GangMemberInfo, task: GangTaskStats): number;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  gang | [GangGenInfo](./bitburner.ganggeninfo.md) | Gang info from [getGangInformation](./bitburner.gang.getganginformation.md) |
|  member | [GangMemberInfo](./bitburner.gangmemberinfo.md) | Member info from [getMemberInformation](./bitburner.gang.getmemberinformation.md) |
|  task | [GangTaskStats](./bitburner.gangtaskstats.md) | Task info from [getTaskStats](./bitburner.gang.gettaskstats.md) |

**Returns:**

number

The calculated money gain.

