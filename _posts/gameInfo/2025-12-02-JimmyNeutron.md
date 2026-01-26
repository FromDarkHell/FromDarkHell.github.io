---
layout: post
title: Jimmy Neutron Game Info
---

**Contents**
* TOC
{:toc}

## No CD Patch
This game checks to see if you have the CD installed, but as far as I know, it doesn't actually need a CD inserted for loading data. It's just basic copy-protection.

This code is what does the jump to the `You need a CD installed` `MessageBoxA` call.
```x86asm
je neutron2.4A3DCD
mov edx, dword ptr ds:[ecx]
lea eax, dword ptr ds:[esi+24]
push eax
call dword ptr ds:[edx+8]
call neutron2.496200 # <--- This function does the checks & calls MessageBoxA with the error
test al, al
```

This call function can just get replaced with a `nop` chain to turn it into:
```x86asm
je neutron2.4A3DCD
mov edx, dword ptr ds:[ecx]
lea eax, dword ptr ds:[esi+24]
push eax
call dword ptr ds:[edx+8]
nop 
nop 
nop 
nop 
nop 
test al, al
```