# C++

> 这些特性的工作原理，应用场景
>
> 内存管理模型，类模型，lambda表达式等特性，写点东西

C++直接控制硬件，代码送往编译器进行编译，输出目标平台的机器码，所以可以直接控制CPU执行的指令

为了适应某个平台，只需要找到对应平台的编译器即可。

C++是本地语言，其编译器为目标平台和目标架构生成机器码

当真正需要追求性能时，便需要C++了

------

## **C++是如何工作的**

源文件给到编译器，输出一些二进制文件，它们可能是库，也可能是可执行文件

\#后的语句叫预处理语句，在编译之前被处理，预处理之后文件将被编译，C++被编译器转为机器码

任何C++程序都有main函数，是程序的入口；main函数不写返回值默认返回0

<<,>>是重载的操作符，可以理解为函数

cout流和cin流

解决方案配置：解决方案平台是指编译代码的目标平台

application(.exe), dynamic library(.dll), static library(.lib)

关闭优化使得我们可以调试

每一个cpp文件都会被编译，但头文件不会被编译；它们在预处理时会被包含进来一起被编译。每个cpp文件被编译成一个目标文件(.obj)；链接器将这些.obj文件合并成一个.exe文件

函数的申明：如果我们只编译这一个文件，编译器是怎么知道这个函数会在另一个文件中呢？答案就是，编译器相信我们；编译器怎么运行到正确的代码呢？这就需要链接器了，当我们构建整个工程时，当找不到函数定义时，就会报链接错误（无法解析的外部符号）。

------

## **编译和链接**

从文本文件/代码转为二进制可执行的机器码需要经过两件事，即编译和链接

编译生成目标文件，做了几件事：预处理，将代码转换为常量数据或指令（创建一个抽象语法树）

被编译的cpp文件被称为翻译单元。c++并不关心文件，文件只是提供给编译器源代码的一种方式。

一个翻译单元得到一个目标文件

obj文件中有什么？二进制的机器码，供CPU实际执行

编译的第一阶段：预处理，编译所有的预处理语句并处理它们，预处理语句时给编译器看的

预处理指令：#include，#define，#if #endif

告诉编译器优化时，编译器就会执行优化

在汇编语言中，会发现函数调用被一串随机字符串修饰了，这就是函数的签名，这需要唯一地定义函数

本质上，有多个obj文件时，函数也被定义在多个obj中时，链接地工作，就是把所有的函数链接在一起，以方便查找函数的签名。调用函数时，编译器便生成call指令。

将文件编译完成之后，通过链接，找到每个符号和函数在哪里并连接起来。即使是单文件编程，仍然需要把main函数链接起来，使应用程序知道程序入口在哪里。

了解报错是编译报错还是链接报错是重要的。

无法解析的外部符号：如果找不到确切的函数定义，就会发生这个链接错误。

有重复的符号：有函数或变量有相同的名字和相同的签名（相同的参数和返回值）

在头文件中写定义会导致重复定义的问题，解决方式：

- static表示，只会在这个翻译单元中用到
- inline表示获取实际的函数体，并将函数调用替换为函数体
- 把函数体放入源文件中，头文件中只写定义

链接也分为静态链接和动态链接

------

## **变量**

存储数据的容器，允许我们进行命名

创建一个变量，它将被存储在内存中，堆或者栈

C++有一系列的原始数据类型，这些不同数据类型在C++中的唯一区别是占用内存大小不同

编译器决定类型的大小，一般来说，int占四字节，编译器由平台决定。

一个字节的范围是0~256 / -128~127

各种原始数据类型：

int	4字节

char	1字节

short	2字节

long	4字节（取决于编译器）

long long	8字节

float	4字节（在数据后加‘f’，否则默认double）

double	8字节

bool	1字节

bool为什么不是1bit：处理寻址内存时，无法寻址只有一个bit位的内容，只能寻址字节；

但可以用一些技巧，在1byte中存8个bool

sizeof操作符可以查到每个数据类型占多少字节

有了基本的数据类型，还可以将他们转换为指针或引用

------

## **函数**

执行特定任务的代码块，主要的目的是防止代码重复

在一个运行的程序中，为了调用一个函数，需要创建一个堆栈结构，需要把参数和返回地址推入堆栈。

**堆栈结构**

有两种不同文件类型的概念，一种是像C++一样编译的编译文件，一个编译单元，这样就会有头文件的概念

头文件：一个公共的地方来存放声明

保证只包含头文件一次的方式：

```
 #pragma once
 #ifndef __LOG_H
 #define __LOG_H
 ...
 #endif
```

头文件在#include中的差异：< >尖括号只用于编译器包含路径；“”引号可以做一切，通常用于包含相对于当前文件的文件

iostream是一个没有后缀名的文件，这是由C++标准库决定的，用于区分C标准库和C++标准库

------

## **调试**

step into 进入函数体内执行

step over 进入下一行执行

step out  跳出当前函数，回到调用它的位置

箭头指向表示下一个要执行的语句

内存视图：如，在memory窗口输入&a，可以跳转到a的地址（输入指针查看值）

调试模式会做一些额外的事，比如，把未初始化的内存设置统一值

**查手册，我的代码都烧录到哪里去了**

反汇编disassembly窗口

------

## **控制流语句**

条件语句：满足条件，跳到某个内存；不满足条件，跳到另一个内存；这样的分支语句，在一定程度上会使程序慢下来；在优化中，将会极力避免分支

**尝试用一些数学计算代替分支语句**

循环：用于重复执行的语句，for用于已知次数的循环，while用于未知次数的循环

控制流语句：continue, break, return

------

## **指针和引用**

指针对于管理和操纵内容非常重要

> 指针是一个存储内存地址的整数，与数据类型无关，只是说这个地址的数据被人为假设为我们给的类型。

代码中做得所有事，几乎都是从内存中读写。

&取地址 / 引用

- 取值 / 逆向引用

void* 问题在于，要向这个地址写入数据时，计算机不清楚向几个字节单位的内存进行操作

直接在栈上创建数据

在堆上开辟一段内存

对x64，一个内存地址占64bit

引用

根本上，引用通常是指针的伪装，指针的语法糖

```
     int num = 3;
     int& ref = num;
```

引用必须“引用”已经存在的变量，并不占用内存，只是创造一个别名

创建引用时，编译器不会为之分配内存，不是真正的变量

```
 int num = 3;
 int& ref = num;
```

所以，引用实际上只存在于我们写的代码中

声明引用时必须初始化

值传递，址传递和引用传递

```
 #include <iostream>
 
 #define LOG(x) std::cout << x << std::endl;
 
 void Increase(int val)
 {
     val++;
 }
 
 void Increase2(int& val)
 {
     val++;
 }
 
 void Increase3(int* ptr)
 {
     (*ptr)++;
 }
 
 int main(void)
 {
     int lw = 1;
 
     Increase(lw);
     LOG(lw);
 
     Increase2(lw);
     LOG(lw);
 
     int* lw_ptr = &lw;
     Increase3(lw_ptr);
     LOG(lw)
 
     std::cin.get();
     return 0;
 }
```

------

## **面向对象**

类，对数据和功能组合在一起的一种方法，把数据和处理这些数据的方法组织起来

这里的思维重点在于，要有意识地把数据组织起来

由类类型构成的变量称为对象，新的对象变量称为实例

类中的成员变量默认为private，这涉及到“可见性”的问题

private意味着，只有类中的函数才能访问这些变量

类内的函数称为方法

类本质上只是语法糖，使代码组织地更有逻辑，易于维护

类和结构体的区别

是否存在可见性

struct在C++存在的原因是，希望与C保持向后兼容性

只涉及POD(Plain Old Data)时，通常用struct，只是一种表示变量的机构；比如数学上的向量；结构体只是数据的结构	[**POD**](https://blog.csdn.net/m0_61629312/article/details/134248559)

需要继承时用class，需要大量功能时使用class

在命名是给成员变量加前缀，可以区分成员变量和局部变量

可见性，只是为了使代码更具有逻辑性，对实际运行没有影响。更多的是提示开发者，应该怎样使用这些代码

private：只有这个类可以访问，派生类也不能访问（友元除外）

protected：只有这个类及其子类可以访问

public：均可访问

------

## **静态static**

两个意思：一个是在类或者结构体外部使用static关键字，另一个是在类或结构体内使用static

类外的static，表示声明的符号，其链接只在这个翻译单元内部。链接器不会在翻译单元之外找定义

类内的static，表示该变量与类的所有实例共享内存；即在所有创建的实例中，静态变量只有一个实例

类或结构体外的static：

与类外的static相对应的是extern，表示需要在外部翻译单元中寻找定义

如果在头文件中声明静态变量，并且将该头文件包含在两个不同的C++文件中，效果就是在两个翻译单元中声明了相同的该变量作为静态变量

如果不需要变量是全局变量，就需要尽可能多地使用静态变量

类或结构体内的static：

> 通过类实例来引用静态变量是没有意义的，因为这就像类的全局实例。
>
> 类内的static变量，就好像在类的命名空间内创建了变量，它们实际上不属于类；
>
> 这其实类似于全局变量，它是在内部进行链接的。

> 静态方法也是一样，无法访问类的实例。
>
> 静态方法可以被调用，不需要通过类的实例。
>
> 而在静态方法内部，不能写引用到类实例的代码，因为不能引用到类的实例。
>
> 静态方法不能访问非静态变量，因为静态方法没有类实例
>
> 非静态方法总是获得当前类的一个实例作为参数。(隐藏参数)
>
> 而静态方法得不到那个隐藏参数

```
 #include <iostream>
 
 class Entity
 {
 public:
     static int x, y;
 
     static void Print()
     {
         std::cout << x << "," << y << std::endl;
     }
 };
 
 class Singleton
 {
 public:
     static Singleton& Get()
     {
         static Singleton instance;
         return instance;
     }
 
     void Hello()
     {
 
     }
 };
 
 int Entity::x;
 int Entity::y;
 
 int main(void)
 {
     Entity::x = 1;
     Entity::y = 2;
     Entity::Print();
 
     Singleton::Get().Hello();
 
     return 0;
 }
```

局部作用域中的static

声明一个变量需要考虑两件事：变量的生存期和作用域

生存期是指变量实际存在的时间，即在内存中会存在多久

作用域是指可以访问变量的范围

在函数内声明一个变量，不能再其它的函数中访问它

静态局部变量允许我们声明一个变量，它的生存期基本上相当于整个程序的生存期

所以，在局部作用域（如函数或类）中声明一个静态变量，可以达到既阻止全局访问，又把生存期延长到整个程序。

------

## **枚举**

一个数值集合，可以实现将一组数值集合作为类型；主要是为了分组

```
 enum Example
 {
     A, B = 3, C
 };
 
 Example x = B;
```

默认从0开始，逐个递增

必须是整数

枚举本身不是一个命名空间，这叫做枚举类

------

## **构造和析构**

构造函数

特殊类型的方法，在每次实例化对象时运行；且只在实例化对象时运行，主要作用是确保初始化了内存并做了一些设置

所以，如果只使用类的静态方法，不会实例化对象，不会运行构造函数

如果不希望在使用时实例化对象，可以用private把构造函数隐藏

不允许构造 / 不允许复制，可以把构造函数声明为delete

析构函数

每次销毁对象时运行，卸载变量，释放内存，同时适用于栈和堆分配的内存

构造函数初始化列表，需要按声明时的顺序写，因为会按照定义类成员的顺序初始化，否则会产生依赖性问题

使用初始化列表可以使构造函数更聚焦于实际的功能，并且保证成员变量只被构造一次（如果不使用初始化列表，会同时调用默认的构造函数）

------

## **继承、多态、虚函数**

继承允许有一个相互关联的类的层次结构，允许有一个包含公共功能的基类，避免代码重复

多态，一个单一类型，但有多个类型的意思

继承出的派生类不仅是派生类，同样也是基类，任何想要使用基类的地方，派生类同样可以使用派生类是基类的超集

基于此，可以通过重写一个方法来代替父类方法运行

如果重写函数，就需要维护一个虚函数表，即需要额外的内存；并且每次调用虚函数时，需要遍历这个表来确定映射到哪个函数

虚函数允许在子类中重写方法，标记为virtual，将基类中的基函数标记为虚函数

通常声明函数时，方法通常在类内部（起作用）。要调用方法时，调用属于该类型的方法。

虚函数引入了一种叫做“动态联编”的技术，通常通过虚函数表进行维护，保证运行时可以映射到正确的覆写函数上，并实现编译。覆写函数可选地可以加override关键字，显式指出时覆写过的函数，并且会在覆写非虚函数时给出报错，更安全。

纯虚函数

```
 virtual int Function(int a) = 0;
```

当提供默认实现没有意义时，想要强制子类，为特定的函数提供自己的定义。创建一个类，只由未实现的方法组成，然后强制子类去实际实现它们，这通常被称为接口。接口中只包含未实现的方法，作为模板。

如果不实现，就不会允许对象的实例化。

构造，析构，继承的例子：

```
#include <iostream>

class Object
{
public:
	float X, Y;

	Object()
	{
		std::cout << "Constructed Object" << std::endl;
		X = 0.0f;
		Y = 0.0f;
	}

	Object(float x, float y)
		: X(x), Y(y)
	{
		std::cout << "Constructed Object" << std::endl;
	}

	~Object()
	{
		std::cout << "Destructed Object" << std::endl;
	}

	void Move(float xa, float ya)
	{
		X += xa;
		Y += ya;
	}
};

class Player : public Object
{
public:
	const char* name;

	void PrintName()
	{
		std::cout << name << std::endl;
	}
};

int main4(void)
{
	Object obj1;
	obj1.Move(1.0f, 2.0f);

	Object obj2(10.0f, 5.0f);
	obj2.Move(1.0f, 2.0f);

	Player player1;
	player1.Move(5.0f, 5.0f);

	return 0;
}
```

------

## **数组**

内存连续的数据结构，用索引进行访问

数组实质是指针

确保在数组边界内写数据，否则将访问不属于你的内存，可能覆盖掉其它数据

在栈上和堆上创建数组，如果要返回一个在函数中创建的数组，就需要在堆中创建

使用new创建数组，则会在内存中保存一个指针，指向一个指定内存大小的内存空间。这叫内存间接寻址。

```
char* buffer = new char[8];
memset(buffer, 0, 8);
delete[] buffer;
```

一般来说需要尽可能避免在堆中创建数组，因为在内存中跳跃肯定会影响性能。

C++11中有内置数据结构std::array，有边界检查，记录数组大小；（原始数组中不能在数组内存中访问到数组大小，需要自己维护），因此会有一小些额外开销

------

## **字符串**

字符是如何工作的：默认通过ascii字符进行文本编码

字符串是字符数组加‘\0’，是不可变的，不能扩展字符串使它变大，是固定分配的字符串

由于字符串是数组，因此也是指针（char指针）

在内存中，以ascii的0结束，即空终止字符，这用来给指针确定终点

C++有内置数据结构std::string，是baseString类的模板版本

双引号里的东西是const char数组，不是真正的字符串

把对象传递给一个函数时，实际上是在复制这个对象，创建一个副本

所以当传递字符串，且只读时，使用常量引用

字符串字面量，双引号之间的一串字符，是const char数组/指针

修改字符串字面量是不被推荐的，因为取了一个指向那个字符串字面量的内存位置的指针，而字符串字面量是存储在内存的只读部分的。有的编译器甚至不会通过这样的代码；在release模式下会发现修改不成功，在debug模式下会抛出运行错误；这是未定义的行为。

如果确实需要修改，可以定义为数组而不是指针

```
#include <iostream>
#include <array>
#include <string>

void PrintString(const std::string& str)
{
	std::cout << str << std::endl;
}

int main5(void)
{
	int array[5] = { 0 };
	int* another_array = new int[5];
	delete[] another_array;

	std::array<int, 5> another;
	for (int i = 0; i < 5; i++)
	{
		another[i] = i;
	}
	std::cout << another.size() << std::endl;

	std::string name = "Hatrix, ";
	name += "Hello, RM!";
	const char* id = "fjdiosjafklds";
	PrintString(name);

	return 0;
}
```

------

## **const**

不会改变代码的生成，就好像类和结构体的可见性，仅对开发人员做规范

一种打破规范的方法是用指针来强制类型转换，但通常不要这么做

指向常量的指针和常量指针的含义，代码上表现为const在*之前或者之后

另一种用法是在方法名的参数列表后加const（只在类中有效），表示这个方法不会修改实际的类，不会修改类成员的方法建议都加上。

> 当把一个对象声明为常量对象，或者，对象常量引用作为函数参数时，函数只能调用带有const的方法，因为不带const的方法不保证类本身不会被修改

------

## **mutable**

mutable用于const方法中又确实需要修改的变量，比如供debug使用的指示标记（主要用途）

第二个用法是lambda表达式，表示通过值传递的变量，可以被改变

------

## **创建对象**

实例化一个对象要选择在堆上还是栈上创建，内存是从哪里来的，即在哪里创建对象

栈上创建的有自动的生存期，即生存期由声明地方的作用域决定

```
#include <iostream>
#include <string>

class Entity
{
private:
	std::string m_Name;
public:
	Entity() : m_Name("Unknown") {}
	Entity(const std::string& name) : m_Name(name) {};
	const std::string& GetName() const
	{
		return m_Name;
	}
};

int main(void)
{
	Entity entity = Entity("Hatrix"); //栈上创建对象
	std::cout << entity.GetName() << std::endl;

    Entity* entity2 = new Entity("Hatrix"); //堆上创建对象
    delete entity2;

	return 0;
}
```

上面展示的，是C++中最快的方法，也是可以管控的方法，去初始化对象

如果对象太大，或者需要显式控制对象的生存期，就在堆上创建;在堆上创建，记得delete

智能指针，超出作用域会被自动删除

------

## **new**

找到一块符合要求的内存，返回指向这块内存的指针

```
int* a = new int[20];
delete [] a;
```

指针只是一个内存地址，是因为需要类型来操作它

通常来说，调用new会调用malloc函数，实际作用是传入需要的内存大小，返回一个void指针；区别在于使用new创建对象会调用构造函数；在C++中不要用前一种方式

同时，使用new一定要delete

------

## **explicit**

隐式转换，比如把一个int直接赋值给对象，实际上是调用了以一个int作为参数的构造函数（把int转换为Entity类）

explicit禁用了隐式implicit的功能，放在构造函数前面，强制开发者必须显式地调用构造函数

强制显示调用的作用，或者说，隐式构造可能导致的问题？

------

## **运算符和运算符重载**

通常代替一个函数，包括new，delete等等，实质都是为了避免重复代码而做的封装

```
#include <iostream>

class Vector2
{
private:
	float x;
	float y;

public:
	Vector2(float x, float y) : x(x), y(y){}

	void PrintVector() const
	{
		std::cout << "(" << x << "," << y << ")" << std::endl;
	}

	Vector2 operator+ (Vector2& other) const
	{
		return Vector2(x + other.x, y + other.y);
	}

	float operator* (Vector2& other) const
	{
		return x * other.x + y * other.y;
	}
};

int main(void)
{
	Vector2 vec1(2.0f, 3.0f);
	Vector2 vec2(4.0f, 5.0f);
	Vector2 vec3 = vec1 + vec2;
	float innerdot = vec1 * vec2;
	vec3.PrintVector();
	std::cout << vec1 * vec2 << std::endl;

	return 0;
}
```

------

## **this**

this是一个指向当前对象实例的指针，该方法属于这个对象实例

this的类型是对象的常量指针，可访问成员函数

------

## **对象的生存期**

每次进入作用域，相当于push栈帧，退出作用域，相当于pop栈帧

不要创建一个基于栈的变量然后返回它的指针

作用域指针，一个指针的包装器，在构造时用堆分配指针，在析构时删除指针

```
class ScopedPtr	//作用域指针类，自动构造，自动析构
{
private:
	int* value;
public:
	ScopedPtr(int* val) : value(val)
	{

	}

	~ScopedPtr()
	{
		delete value;
	}
};

int main(void)
{
	{
		ScopedPtr ptr = new int();	//隐式转换
	}

	return 0;
}
```

基于栈的变量，离开作用域就被销毁，有很多应用：作用域指针，计时器，互斥锁（锁定一个函数使得多个线程同时访问它时不会爆炸）（可以利用栈的特性有一个自动作用域锁定）

------

## **智能指针**

自己编写内存管理系统？内存管理模型

智能指针使得内存管理自动化，防止因为忘记delete而造成内存泄漏

创建时自动调用new分配内存，作用域结束时自动delete

- 作用域指针unique_ptr，不能复制一个unique_ptr，因为如果两个指针指向同一块内存，通过一个指针将内存释放，另一个就会指向未被分配的内存，造成内存泄露。unique_ptr的构造函数是explicit的，没有额外开销
- 共享指针shaerd_ptr,实现的方式取决于编译器和在编译器中使用的标准库；工作原理是引用计数，即跟踪指针有多少个引用，引用计数归零时，指针被删除；稍有额外开销用于存储引用计数值
- shared_ptr赋值给shared_ptr会增加引用计数，赋值给weak_ptr不会
- `#include <iostream>#include <memory>class Entity{public:	Entity()	{	std::cout << "Created Entity3" << std::endl;	}	~Entity()	{	std::cout << "Destroryed Entity3" << std::endl;	}	void Print() {}};int main(void){	std::unique_ptr<Entity> entity(new Entity());	entity->Print();	//如果构造函数碰巧抛出异常，下面这种方式不会得到没有引用的悬空指针，避免了内存泄露	std::unique_ptr<Entity> entity2 = std::make_unique<Entity>(); entity2->Print(); 	std::shared_ptr<Entity> entity3 = std::make_shared<Entity>(); entity3->Print();	return 0;}`

------

## **拷贝与拷贝构造函数**

拷贝要求的是复制内存，但当我们只是想读取、或是修改已经存在的对象时，可以避免不必要的复制

值复制，地址复制

浅拷贝，复制各个成员对象；

复制指针会使得两个指针同时指向一块内存，存在同一块内存被释放两次的风险；改变一个时，两者会被同时改变

深拷贝，复制整个对象，如拷贝构造函数

拷贝构造函数：当创建一个新变量并给它分配另一个变量时，它和正在创建的变量类型相同，复制这个变量，就是所谓的拷贝构造函数

不允许构造 / 不允许复制，可以把构造函数声明为delete

对象在作为函数参数时，拷贝构造函数也会被调用，为了避免这个不必要的开销，可以传引用

```
#include <iostream>

class String
{
private:
	char* m_Buffer;
	unsigned int m_Size;
public:
	String(const char* str)
	{
		std::cout << "Constructed String!" << std::endl;
		m_Size = (unsigned int)strlen(str);
		m_Buffer = new char[m_Size + 1];
		memcpy(m_Buffer, str, m_Size);
		m_Buffer[m_Size] = '\\0';
	}

	// 拷贝构造函数
	String(const String& other) : m_Size(other.m_Size)
	{
		std::cout << "Copied String!" << std::endl;
		m_Buffer = new char[m_Size + 1];
		memcpy(m_Buffer, other.m_Buffer, m_Size + 1);
	}

	~String()
	{
		std::cout << "Destructed String!" << std::endl;
		delete[] m_Buffer;
	}

	friend std::ostream& operator<< (std::ostream& stream, const String& string);
};

std::ostream& operator<< (std::ostream& stream, const String& string)
{
	stream << string.m_Buffer;
	return stream;
}

void PrintString(const String& string)
{
	std::cout << string << std::endl;
}

int main(void)
{
	String str1 = String("Hatrix");
	String str2 = str1;
	PrintString(str1);
	PrintString(str2);

	return 0;
}
```

**在绝大多数情况下，总是通过const引用去传递对象，总是！**

**重载<<为什么这么写？**

------

## **箭头操作符**

除了正常用法之外，还可以重载用于自定义功能

## **静态数组**

std::array

------

## **动态数组**

开始**C++标准库，标准模板库**

标准模板库本质上是容器、容器类型的集合，可以模板化任何东西

std::vector：本质上是一个动态数组，不强制元素具有唯一性的集合；与标准数组不同的是，可以变化动态大小；标准库对其的实现，是超过了就再开辟一片足够容纳的内存空间，复制过来然后删除旧的。即通过经常分配去实现，故不能得到最佳性能，除非正确设置。

堆分配类对象，栈存储指向类对象的指针 or 栈分配类对象：视情况而定。前者内存连续，在技术上是最优的；但问题在于，当需要调整大小时，需要重新分配和复制所有东西，会非常慢；而指针则可以保持实际指向的内存不变。

如果可能的话，尽量使用对象而不是指针

优化：

C++语言能够很好地发挥优化的作用

优化最重要的规则是，了解你的环境，并知道如何使用可用的工具来优化它；比如，要优化复制，就要知道复制时什么时候发生的，为什么会发生

**对于使用但不特别深入地开发C++本身，还有什么需要掌握的，或者有什么相对没那么重要？对于使用新框架呢？**

**C++涉及的优化，标准和实现；标准是C++标准库对于容器和算法提供的方案，开发者也可以自己根据需求去实现**

**为什么说内存管理模型有很大差别，本身带有线程管理？**

**如果只使用类和对象、继承、多态、虚函数这些概念，是否可以认为几乎可以当作C来写，对于一个已经掌握C语言的人来说，几乎没有门槛**

如何避免复制操作

```
#include <iostream>
#include <string>
#include <vector>

struct Vertexffs
{
	float x, y, z;

	Vertex(float x, float y, float z) : x(x), y(y), z(z) {}

	Vertex(const Vertex& vertex) : x(vertex.x), y(vertex.y), z(vertex.z)
	{
		std::cout << "Copied" << std::endl;
	}
};

std::ostream& operator<< (std::ostream& stream, const Vertex& vertex)
{
	stream << "(" << vertex.x << "," << vertex.y << "," << vertex.z << ")";
	return stream;
}

int main(void)
{
	std::vector<Vertex> vertices;
	vertices.reserve(3); //reserve可以确保有足够的内存，但不创建对象
	vertices.push_back({ 1, 0, 0 });
	vertices.push_back({ 0, 1, 0 });
	vertices.push_back({ 0, 0, 1 });

	//emplace_back 不是传递已经构建的vertex对象，而是传递构造函数的参数列表；
	//在实际vector的内存中，使用以下参数，构造一个vertex对象
	std::vector<Vertex> another_vertices;
	another_vertices.reserve(3);
	another_vertices.emplace_back(1, 2, 3);
	another_vertices.emplace_back(4, 5, 6);
	another_vertices.emplace_back(7, 8, 9);

	for (int i = 0; i < vertices.size(); i++)
	{
		std::cout << vertices[i] << std::endl;
	}

	// 部分移除：通过迭代器完成
	vertices.erase(vertices.begin() + 1);

	for (Vertex& v : vertices)
	{
		std::cout << v << std::endl;
	}

	// 全部清零
	vertices.clear();

	return 0;
}
```

------

## **C++库**

C#和python中，通过包管理器来添加库

**包管理器是什么？**

如果是正式的项目，推荐构建源代码；可以添加一个项目，包含依赖库的源代码，然后自己编译为静态库或动态库

如果是一次性项目，推荐直接链接二进制文件

处理二进制文件（GLFW库）

C++库的典型目录：includes（一堆头文件）和library（预先构建的二进制文件）

静态库(.lib)表示库会被被放到可执行文件中，动态库(.dll)是在运行时被链接的；主要的区别是，库文件是否被编译或链接到exe文件中，还是作为一个单独的文件（dll）和exe放在一起

静态链接在技术上更快，因为编译器或链接器可以执行链接时优化之类的，但对于动态库，由于不知道会发生什么，动态链接库被运行时的程序装载时，程序的部分将被补充完整；所以，静态链接通常是最好的选择；

编译器指向头文件，链接器指向库文件

**github:project based learning**

**为什么需要静态和动态的设计**

引号和尖括号，引号先检查相对路径，找不到就检查编译器的include路径；如果在解决方案中，可以优先使用引号。如果是完全外部的库，优先使用尖括号

在C++中使用C语言的库，需要写extern "C"

静态链接有很多优化会发生，因为编译器和链接器完全知道实际进入应用程序的代码；动态链接有两种，一种是，可执行文件依赖于动态库，即已经知道里面有什么函数；另一种是，完全动态地加载动态库，可执行文件和动态库没有任何关系。即想任意加载这个动态库，甚至不用知道里面有什么

------

## **如何处理多返回值**

可以通过vector或者array类实现，需要类型相同

还可以通过tuple或者pair类实现，不关心类型

还可以返回一个结构体

------

## **模板templates**

有点像宏，允许定义一个可以根据用途进行编的模板，可以让编译器基于一套规则为你写代码

比如，函数的大部分都相同，只是返回值不同

使用模板，只有实际调用时，这些函数才被真的创建；否则模板不会存在于代码中

通过指定模板参数得到不同函数，不同容器类型和大小

类似于模板元编程，在编译时实际在进行编程

```
#include <iostream>
#include <string>

template<typename T>
void Print(T value)
{
	std::cout << value << std::endl;
}

template<typename T, int N>
class Array
{
private:
	T m_array[N];
public:
	int GetSize() const
	{
		return N;
	}
};

int main(void)
{
	Print<int>(5); //也可以不写int，是隐式获得类型
	Print<std::string>("Hello RM!");

	Array<int, 3> array;
	std::cout << array.GetSize() << std::endl;

	return 0;
}
```

------

## **栈和堆的内存**

程序启动后，操作系统将整个程序加载到内存，并分配物理RAM，栈通常是一个预定义大小的内存区域，堆也是一个预定义了默认值的区域，但可以随程序运行而变化，重要的是要知道两个内存区域的物理地址，我们可以向C++申请内存空间，顺利则会返回给我们指定大小的内存空间

栈与堆的不同之处在于，如何为我们分配内存

栈的分配，实际上是移动栈顶指针；栈中的数据都是挨着的，只是把东西叠在一起，因此栈分配非常块，只需要移动栈指针并返回即可

堆的分配，内存不是连续的，除了智能指针外，需要手动释放内存；程序会维护一个free list，跟踪哪些内存块是空闲的。堆上分配内存，需要：检查空闲列表，请求内存，做好记录

非必要不在堆上分配内存，都在栈上分配

## **宏**

字符串替换，反斜杠\用于多行

## **auto**

自动推断类型，一种变成风格

## **函数指针**

原始函数指针，函数名称提供了内存地址的索引，可以当作函数指针

```
void Hello()
{
	std::cout << "Hello!" << std::endl;
}

int main(void)
{
	void(*func_name)() = Hello;
	func_name();

	return 0;
}
```

## **lambda表达式**

用完既弃的函数，不用声明，在运行过程中生成

不通过函数定义就可以定义一个函数的方法，使用函数指针的地方都可以设置为lambda

## **命名空间**

尽量限制在一个小的作用域之内

## **二维数组**

指针数组，有内存碎片问题，会导致cache miss，尽量使用一位数组；优化代码最重要的一点，就是优化内存访问

## **联合体**

类似于结构体，但一次只能占用一个成员的内存

------

## **一些补充**

volatile 影响编译器编译的结果,volatile指出 变量是随时可能发生变化的，与volatile变量有关的运算，不要进行编译优化，以免出错，（VC++ 在产生release版可执行码时会 进行编译优化，加volatile关键字的变量有关的运算，将不进行编译优化。）

~按位取反