# GoogleAdCustom

Add and change your GoogleAds to your site dynamically by changing it only on one place.

## Getting Started

This component doesn't need any Javascript library or frameworks.

### Prerequisites

Place this Javascript file to at the bottom of your page.

```
<script src="/js/GoogleAdCustom/GoogleAdCustom.js"></script>
```

### Installing
You don't need to call any function to initialize
You can replace Slot and Pub Code in GoogleAdCustom.js file.

this component will find every 
```<gad data-ad="970x90"></gad>``` 
elements and change it with the ad

## Examples
```<gad data-ad="970x90"></gad>``` => Will find _970x90 element from Config variable and replace with it

```<gad data-ad="970x90" data-slot="123123"></gad>``` => Same as above, data-slot will be used as Slot.

```<gad data-ad="970x90" data-passive="true"></gad>``` => Will not load ad

```<gad data-ad="970x90" data-custom="true"></gad>``` => Will not look to Config variable for ads properties, 
                                                         takes 970 as width and 90 as height

```<gad data-ad="970x90" data-custom="true" data-slot="12312323"></gad>``` => Same as above, data-slot will be used as Slot

## Built With

* No Javascript framework or library used.

## Authors

* Only me - Mario

## License

No License - Just May The Force Be With You Fellow Siths
