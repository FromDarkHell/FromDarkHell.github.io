---
layout: post
title: Borderlands 2 VR Game Info
redirect_from: "/bl2"
---

**Contents**
* TOC
{:toc}

## Modding
So, as BL2VR is still in UE3, the same modding techniques that apply for BL2/TPS also apply to BL2VR.
There's a few differences as BL2VR was compiled in 64bit and (I think) is on a newer engine version.
But it's even less technically complicated than BL2 in terms of edits necessary.
In order to apply the hex edits:
- You want to open your `Binaries/Win64/Borderlands2VR.exe` in a hex editor (I'm a big fan of [hexed.it](https://hexed.it/))
- Search for `say` (Match Case) as UTF-16 text.
    * Replace the letters "say" with spaces, for example it should be `0x20 0x00 0x20 0x00 0x20 0x00`.

This is all you need to do!
For some reason in BL2/TPS, there's an extra hex edit needed to enable the `set` command, but in BL2VR you don't need to do that!

You'll want to enable your console (it's really horrible to type in in VR btw):
* Go to `Documents/My Games/Borderlands 2 VR/WillowGame/Config`
* Open `WillowInput.ini` in Notepand or whatever you use
* Search for `ConsoleKey=` and make it `ConsoleKey=Tilde`/`ConsoleKey=F6` (all keys pretty much work)

From here, you can install txt mod files into `Binaries` and make sure to enable your console.

### UnrealScript
If you've ever written SDK mods for BL2/TPS or tinkered into UE3 games, you'll know that UE3 uses UnrealScript as a scripting language.
For some reason in BL2VR (I presume it's something weird with porting), almost all UnrealScript classes/functions that were available in BL2 have since been switched to using UE3's `dllbind(...)` <sup>[?](https://docs.unrealengine.com/udk/Three/DLLBind.html)</sup>

With the addition of VR / BAMF Mode, GBX had to add a few different extra classes:
(Ones with `Engine` weren't added by GBX explictly but by their engine upgrade)
```
Class WillowGame.WillowSkelControl_CacheAnimationTransforms
Class WillowGame.WillowSeqAct_SetOffHandEchoMeshVisibility
Class WillowGame.WillowSeqAct_SpawnMenuPawn
Class WillowGame.WillowScrollingListDataProviderVROptions
Class WillowGame.WillowScrollingListDataProviderCrossSaves
Class WillowGame.WillowPlayerMenuPawn
Class WillowGame.WillowAIDefinitionBase
Class WillowGame.VirtualKeyboardGFxMovie
Class WillowGame.UILayoutDefinition
Class WillowGame.UISectionManager
Class WillowGame.TeleportStandIn
Class WillowGame.TeleportDefinition
Class WillowGame.SpawnableSceneCapture2DActor
Class WillowGame.SlomoDefinition
Class WillowGame.ScopeDefinition
Class WillowGame.ReticleDefinition
Class WillowGame.Protea_3DReticle
Class WillowGame.ProteaSeqCond_IsDirectMovement
Class WillowGame.ProteaSeqCond_SwitchVRPlatform
Class WillowGame.ProteaVehicleDefinition
Class WillowGame.PlayerBehavior_ToggleMeleeWeaponDetachTimer
Class WillowGame.DirectMovementDefinition
Class WillowGame.DashDefinition
Class WillowGame.CustomizationStandIn
Class WillowGame.Behavior_ToggleWandMelee
Class WillowGame.Behavior_ToggleWandMeleeVRAnim
Class WillowGame.Behavior_SetVRMeleeDefinition
Class WillowGame.Behavior_SetDynamiteBlendState
Class WillowGame.Behavior_RestoreSlomo
Class WillowGame.Behavior_IsUsingMotionController
Class WillowGame.Behavior_ForceLowViewDistance
Class WillowGame.Behavior_GetVRHandInfo
Class WillowGame.Behavior_GetVRReticleInfo
Class WillowGame.Behavior_AddSlomoBonus

Class Engine.StereoLayerComponent
Class Engine.SeqAct_SetSplashScreen
Class Engine.SeqAct_ShowSplashScreen
Class Engine.SeqAct_EnableAutoLoadingSplashScreen
Class Engine.SeqAct_HideSplashScreen
Class Engine.SeqAct_ModifyActorsToReflect
Class Engine.SeqAct_DisableAutoLoadingSplashScreen
Class Engine.SceneCaptureReflectVolume
Class Engine.OnlineEventTracker
Class Engine.OnlineGameDVRInterface
Class Engine.OnlineMarketplaceInterface
Class Engine.OnlineSaveInterface
Class Engine.AimControllerComponent
Class Engine.MotionControllerComponent
Class Engine.MultitouchGestureProcessor
```