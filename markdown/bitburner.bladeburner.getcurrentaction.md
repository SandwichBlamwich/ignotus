<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [bitburner](./bitburner.md) &gt; [Bladeburner](./bitburner.bladeburner.md) &gt; [getCurrentAction](./bitburner.bladeburner.getcurrentaction.md)

## Bladeburner.getCurrentAction() method

Get current action.

**Signature:**

```typescript
getCurrentAction(): BladeburnerCurAction;
```
**Returns:**

[BladeburnerCurAction](./bitburner.bladeburnercuraction.md)

Object that represents the player’s current Bladeburner action.

## Remarks

RAM cost: 1 GB

Returns an object that represents the player’s current Bladeburner action. If the player is not performing an action, the function will return an object with the ‘type’ property set to “Idle”.

