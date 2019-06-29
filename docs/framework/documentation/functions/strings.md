# String Functions

The string functions were implemented to handle the negative values being passed to the `spacing()` function, but are available to help you write your own `functions` and `mixins`.

## Replace

The `str-replace()` function is designed to find a substring in a string a replace it with another value. The function take three parameters: the original value, the value to look for, and the value to replace it with.

### Example

```scss
$prefix-color: 'dark-primary';
$color: str-replace($prefix-color, 'dark-', '');
// $color is 'primary'

$color-2: str-replace($prefix-color, 'primary', 'light');
// $color-2 is 'dark-light'
```

## Ends With

The `str-ends-with()` function determines whether a string ends with the characters of a specified string and returns `true` if the string ends with the characters, and `false` if not. The function takes two parameters: the first is the string that you want validate and the second is the string to search for.

### Example

```scss
$prefix-color: 'dark-primary';
$is-primary: str-ends-with($prefix-color, 'primary');
// $is-primary is true
```

## Contains

The `str-contains()` function determines whether a string contains the characters of a specified string and returns `true` if the string contains the characters, and `false` if not. The function takes two parameters: the first is the string that you want validate and the second is the string to search for.

### Example

```scss
$prefix-color: 'dark-primary';
$has-dash: str-contains($prefix-color, '-');
// $has-dash is true
```
