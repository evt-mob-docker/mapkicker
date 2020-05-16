package main

import (
	"database/sql"
	"log"
	"mapkicker/web"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	d, err := sql.Open("mysql", dataSource())
	if err != nil {
		log.Fatal(err)
	}
	defer d.Close()
	// CORS is enabled only in prod profile
	cors := os.Getenv("profile") == "prod"
	app := web.NewApp(cors)
	err = app.Serve()
	log.Println("Error", err)
}

func dataSource() string {
	host := "localhost"
	pass := "pass"
	if os.Getenv("profile") == "prod" {
		host = "db"
		pass = os.Getenv("db_pass")
	}
	return "goxygen:" + pass + "@tcp(" + host + ":3306)/goxygen"
}
