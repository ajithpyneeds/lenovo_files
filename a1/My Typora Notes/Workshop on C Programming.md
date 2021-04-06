# Workshop on C Programming

[TOC]



### Introduction

-  C is a general-purpose, procedural, imperative computer programming, high level  language developed in 1972 by Dennis M. Ritchie at the Bell Telephone Laboratories to develop the UNIX operating system. 
- C was originally first implemented on the DEC PDP-11 computer. 
- C is the most widely used computer language. It keeps fluctuating at number one scale of popularity along with Java programming language, which is also equally popular and most widely used among modern software programmers.

In 1978, Brian Kernighan and Dennis Ritchie produced the first publicly available description of C, now known as the K&R standard.

### Features of C

- Easy to learn
- Portable
- Structured High Level Language
- Produces efficient programs
- Can handle low-level activities
- Can be compiled on a variety of computer platforms.

### Facts about C

- C was invented to write an operating system called UNIX. The UNIX OS was completely written in C.
- C is a successor of B language which was introduced around the early 1970s.
- The language was formalised in 1988 by the American National Standard Institute (ANSI).
- Today C is the most widely used and popular System Programming Language.
- Most of the state-of-the-art software have been implemented using C.
- Today's most popular Linux OS, the C compiler, and essentially all UNIX application programs, RDBMS and MySQL  have been written in C.

### Application of C

Some examples of the use of C might be-

- Operating Systems
- Language Compilers
- Assemblers
- Text Editors
- Print Spoolers
- Network Drivers
- Modern Programs
- Database
- Utilities

### Local Environment Setup

If you want to set up your environment for C programming language, you need the following two software tools available on your computer, (a)Text Editor and (b) The C Compiler.

#### Text Editor:

This will be used to type your program. Examples of few editors include Windows Notepad, OS Edit command, Brief, Epsilon, EMACS, and vim or vi.

The name and version of text editors can vary on different operating systems. For example, Notepad will be used on Windows, and vim or vi can be used on windows as well as on Linux or UNIX.

The files you create with your editor are called the source files and they contain the program source codes. The source files for C programs are typically named with the extension "**.c**".

#### The C Compiler

The source code written in source file is the human readable source for your program. It needs to be "compiled", into machine language so that your CPU can actually execute the program as per the instructions given.

The compiler compiles the source codes into final executable programs. The most frequently used and free available compiler is the GNU C/C++ compiler, otherwise you can have compilers either from HP or Solaris if you have the respective operating systems.

The following section explains how to install GNU C/C++ compiler on various OS. We keep mentioning C/C++ together because GNU gcc compiler works for both C and C++ programming languages.

#### On UNIX/Linux

If you are using **Linux or UNIX**, then check whether GCC is installed on your system by entering the following command from the command line −

```c
$ gcc -v
```

- Enter

```c
Using built-in specs.
COLLECT_GCC=gcc
COLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/7/lto-wrapper
OFFLOAD_TARGET_NAMES=nvptx-none
OFFLOAD_TARGET_DEFAULT=1
Target: x86_64-linux-gnu
Configured with: ../src/configure -v --with-pkgversion='Ubuntu 7.4.0-1ubuntu1~18.04' --with-bugurl=file:///usr/share/doc/gcc-7/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++ --prefix=/usr --with-gcc-major-version-only --program-suffix=-7 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --with-sysroot=/ --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-libmpx --enable-plugin --enable-default-pie --with-system-zlib --with-target-system-zlib --enable-objc-gc=auto --enable-multiarch --disable-werror --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu
Thread model: posix
gcc version 7.4.0 (Ubuntu 7.4.0-1ubuntu1~18.04) 

```

#### On Mac OS	

If you use Mac OS X, the easiest way to obtain GCC is to download the Xcode development environment from Apple's web site and follow the simple installation instructions. Once you have Xcode setup, you will be able to use GNU compiler for C/C++.

Xcode is currently available at [developer.apple.com/technologies/tools/](https://developer.apple.com/technologies/tools/).

#### On Windows

To install GCC on Windows, you need to install MinGW. To install MinGW, go to the MinGW homepage, [www.mingw.org](http://www.mingw.org/), and follow the link to the MinGW download page. Download the latest version of the MinGW installation program, which should be named MinGW-<version>.exe.

While installing Min GW, at a minimum, you must install gcc-core, gcc-g++, binutils, and the MinGW runtime, but you may wish to install more.

Add the bin subdirectory of your MinGW installation to your **PATH** environment variable, so that you can specify these tools on the command line by their simple names.

After the installation is complete, you will be able to run gcc, g++, ar, ranlib, dlltool, and several other GNU tools from the Windows command line.

### Hello World Example

 A C program basically consists of the following parts −

- Preprocessor commands
- Functions
- Variables
- Statements & Expressions
- Comments.

Let us try to execute a simple code-

```c
#include<stdio.h>
int main(){
    /* my first program in C */
    printf("Hello World!\n");
    return 0;
}
```

Let us take a look at the various parts of the above program −

|      Syntax       | Description                                                  |
| :---------------: | :----------------------------------------------------------- |
| #include<stdio.h> | Preprocessor command, which tells a C compiler to include standard input output header file before going to actual compilation. |
|    int main()     | The main function where the program execution begins.        |
|    /* ..... */    | It will be ignored by the compiler and it has been put to add additional comments in the program. |
|  printf(......)   | Another function available in C which causes the message "Hello, World!" to be displayed on the screen. |
|     return 0      | Terminates the main() function and returns the value 0.      |
|         ;         | Statement terminator. That is, each individual statement must be ended with a semicolon. It indicates the end of one logical entity. |

### Tokens in C

A C program consists of various tokens and a token is either a keyword, a identifier, a constant, a string literal, or a symbol. For example, the following C statement consists of five tokens −

```c
printf("Hello World! \n");
```

| The individual tokens are- |
| -------------------------- |
| printf                     |
| (                          |
| "Hello World! \n"          |
| )                          |
| ;                          |

### Identifiers

A C identifier is a name used to identify a variable, function, or any other user-defined item. An identifier starts with a letter A to Z, a to z, or an underscore '_' followed by zero or more letters, underscores, and digits (0 to 9).

C does not allow punctuation characters such as @, $, and % within identifiers. C is a **case-sensitive** programming language. Thus, Score and score are two different identifiers in C. Here are some examples of acceptable identifiers −

```c
Modi  amith_shah  a_123  hbd10  t  _d  a02a10  inTell
```

### Keywords

The following list shows the reserved words in C. These reserved words may not be used as constants or variables or any other identifier names.

| auto     | else   | long     | switch   |
| -------- | ------ | -------- | -------- |
| break    | enum   | register | typedef  |
| case     | extern | return   | union    |
| char     | float  | short    | unsigned |
| const    | for    | signed   | void     |
| continue | goto   | sizeof   | volatile |
| default  | if     | static   | while    |
| do       | int    | struct   | _Packed  |
| double   |        |          |          |

### Whitespace in C

A line containing only whitespace, possibly with a comment, is known as a blank line, and a C compiler totally ignores it.

Whitespace is the term used in C to describe blanks, tabs, newline characters and comments. Whitespace separates one part of a statement from another and enables the compiler to identify where one element in a statement, such as int, ends and the next element begins. Therefore, in the following statement −

```(
int age;
```

there must be at least one whitespace character (usually a space) between int and age for the compiler to be able to distinguish them. On the other hand, in the following statement −

```
fruit = apples + oranges;   // get the total fruit
```

no whitespace characters are necessary between fruit and =, or between = and apples, although you are free to include some if you wish to increase readability.

### The data types in C can be classified as follows-

1. **Basic Types**

   They are arithmetic types and are further classified into: (a) integer types and (b) floating-point types.

2. **Enumerated types**

   They are again arithmetic types and they are used to define variables that can only assign certain discrete integer values throughout the program.

3. **The type void**

   The type specifier *void* indicates that no value is available.

4. **Derived types**

   They include (a) Pointer types, (b) Array types, (c) Structure types, (d) Union types and (e) Function types.

### Defining Constants

There are two simple ways in C to define constants −

- Using **#define** preprocessor.
- Using **const** keyword.

### The #define Preprocessor

Given below is the form to use #define preprocessor to define a constant −

```c
#define identifier value
```

The following example explains it in detail −

```c
#include <stdio.h>
#define LENGTH 10   
#define WIDTH  5
#define NEWLINE '\n'

int main() {
   int area;  
  
   area = LENGTH * WIDTH;
   printf("value of area : %d", area);
   printf("%c", NEWLINE);

   return 0;
}
```

When the above code is compiled and executed, it produces the following result −

```c
value of area : 50
```

### The const Keyword

You can use **const** prefix to declare constants with a specific type as follows −

```
const type variable = value;
```

The following example explains it in detail −

```c
#include <stdio.h>	

int main() {
   const int  LENGTH = 10;
   const int  WIDTH = 5;
   const char NEWLINE = '\n';
   int area;  
   
   area = LENGTH * WIDTH;
   printf("value of area : %d", area);
   printf("%c", NEWLINE);

   return 0;
}
```

When the above code is compiled and executed, it produces the following result −

```
value of area : 50
```

Note that it is a good programming practice to define constants in CAPITALS.

### Storage Class

A storage class defines the scope (visibility) and life-time of variables and/or functions within a C Program. They precede the type that they modify. We have four different storage classes in a C program −

- auto
- register
- static
- extern

### The auto Storage Class

The auto storage class is the default storage class for all local variables.

```c
{
   int mount;
   auto int month;
}
```

The example above defines two variables with in the same storage class. 'auto' can only be used within functions, i.e., local variables. 

