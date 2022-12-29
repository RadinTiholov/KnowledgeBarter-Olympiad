using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KnowledgeBarter.Server.Data.Migrations
{
    public partial class AddLikedAndBoughtLessonsAndCourses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplicationUserCourse",
                columns: table => new
                {
                    BoughtCoursesId = table.Column<int>(type: "int", nullable: false),
                    UsersWhoBoughtId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserCourse", x => new { x.BoughtCoursesId, x.UsersWhoBoughtId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserCourse_AspNetUsers_UsersWhoBoughtId",
                        column: x => x.UsersWhoBoughtId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUserCourse_Courses_BoughtCoursesId",
                        column: x => x.BoughtCoursesId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserCourse1",
                columns: table => new
                {
                    LikedCoursesId = table.Column<int>(type: "int", nullable: false),
                    UsersWhoLikedId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserCourse1", x => new { x.LikedCoursesId, x.UsersWhoLikedId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserCourse1_AspNetUsers_UsersWhoLikedId",
                        column: x => x.UsersWhoLikedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUserCourse1_Courses_LikedCoursesId",
                        column: x => x.LikedCoursesId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserLesson",
                columns: table => new
                {
                    BoughtLessonsId = table.Column<int>(type: "int", nullable: false),
                    UsersWhoBoughtId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserLesson", x => new { x.BoughtLessonsId, x.UsersWhoBoughtId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserLesson_AspNetUsers_UsersWhoBoughtId",
                        column: x => x.UsersWhoBoughtId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUserLesson_Lessons_BoughtLessonsId",
                        column: x => x.BoughtLessonsId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ApplicationUserLesson1",
                columns: table => new
                {
                    LikedLessonsId = table.Column<int>(type: "int", nullable: false),
                    UsersWhoLikedId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserLesson1", x => new { x.LikedLessonsId, x.UsersWhoLikedId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserLesson1_AspNetUsers_UsersWhoLikedId",
                        column: x => x.UsersWhoLikedId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ApplicationUserLesson1_Lessons_LikedLessonsId",
                        column: x => x.LikedLessonsId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserCourse_UsersWhoBoughtId",
                table: "ApplicationUserCourse",
                column: "UsersWhoBoughtId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserCourse1_UsersWhoLikedId",
                table: "ApplicationUserCourse1",
                column: "UsersWhoLikedId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserLesson_UsersWhoBoughtId",
                table: "ApplicationUserLesson",
                column: "UsersWhoBoughtId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserLesson1_UsersWhoLikedId",
                table: "ApplicationUserLesson1",
                column: "UsersWhoLikedId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserCourse");

            migrationBuilder.DropTable(
                name: "ApplicationUserCourse1");

            migrationBuilder.DropTable(
                name: "ApplicationUserLesson");

            migrationBuilder.DropTable(
                name: "ApplicationUserLesson1");
        }
    }
}
