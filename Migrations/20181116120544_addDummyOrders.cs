using Microsoft.EntityFrameworkCore.Migrations;

namespace CYouEcommerce.Migrations
{
    public partial class addDummyOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100000, 'address1', 'va', '22311', 1, 'New', 'cpu1', 'motherboard1', 'ram1', 'storage1', 'gpu1', 'power1', 'cool1', 'case1', 1111, '2018-08-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100002, 'address2', 'md', '23145',2, 'New', 'cpu2', 'motherboard2', 'ram2', 'storage2', 'gpu2', 'power2', 'cool2', 'case2', 2311, '2018-11-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100003, 'address3', 'wy', '12345',2, 'Used', 'cpu3', 'motherboard3', 'ram3', 'storage3', 'gpu3', 'power3', 'cool3', 'case3', 1311, '2018-04-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100004, 'address4', 'wv', '72827',1, 'Used', 'cpu4', 'motherboard4', 'ram4', 'storage4', 'gpu4', 'power4', 'cool4', 'case4', 1411, '2018-05-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100005, 'address5', 'mi', '84524',1, 'New', 'cpu5', 'motherboard5', 'ram5', 'storage5', 'gpu5', 'power5', 'cool5', 'case5', 12111, '2018-04-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100006, 'address6', 'oh', '83456',2, 'New', 'cpu6', 'motherboard6', 'ram6', 'storage6', 'gpu6', 'power6', 'cool6', 'case6', 16111, '2018-03-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100007, 'address7', 'wa', '45689', 2, 'Used', 'cpu7', 'motherboard7', 'ram7', 'storage7', 'gpu7', 'power7', 'cool7', 'case7', 7111, '2018-02-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100008, 'address8', 'ga', '73455',1, 'Used', 'cpu8', 'motherboard8', 'ram8', 'storage8', 'gpu8', 'power8', 'cool8', 'case8', 1811, '2018-01-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100009, 'address9', 'ny', '08967',1, 'New', 'cpu9', 'motherboard9', 'ram9', 'storage9', 'gpu9', 'power9', 'cool9', 'case9', 9911, '2018-12-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100010, 'address10', 'ca', '46973',2, 'New', 'cpu10', 'motherboard10', 'ram10', 'storage10', 'gpu10', 'power10', 'cool10', 'case10', 10101, '2018-12-11 09:46:09.6291009')");
          migrationBuilder.Sql("insert into orders ([Order_Number],[Address],[State],[ZipCode],[AccountInfoOrderId],[Type],[CPU],[Motherboard],[RAM],[Storage],[GPU],[Power_Supply],[Cooling_Fan],[Case],[Total_Price],[OrderDate]) values (100011, 'address11','al', '17455', 1, 'Used', 'cpu11', 'motherboard11', 'ram11', 'storage11', 'gpu11', 'power11', 'cool11', 'case11', 11111, '2018-10-11 09:46:09.6291009')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
