export class DateTime {

    private week = {
        0: "Domingo",
        1: "Segunda",
        2: "Terça",
        3: "Quarta",
        4: "Quinta",
        5: "Sexta",
        6: "Sabado"
    };

    private today = "Hoje";

    private tomorrow = "Amanhã";

    getTodayDate(days: []): object {

        const now = new Date();
        const today = now.getDay();
        let days_week = [];
        let result = [];

        days.map(function(value) {
            days_week.push(value);
        });

        for(let i = 0; i < days_week.length; i++) {
            if (this.week[today] == days_week[i].week_days) {
                result.push(this.today);
            } else if (this.week[today+1] == days_week[i].week_days) {
                result.push(this.tomorrow);
            } else {
                result.push(days_week[i].week_days);
            } 
        }

        return this.orderDate(result);
    }

    orderDate(result: object): object {
        let lastResult = [],
            firstResult = [],
            finalResult = [],
            keyToday = 0;

        for (const key in result) {
            if (result[key] == this.today) {
                keyToday = parseInt(key, 10);
            }
        }

        for (const key in result) {
            if (result[key] == this.today) {
                firstResult.push(result[key]);
            }

            if (result[key] != this.today && parseInt(key, 10) < keyToday) {
                lastResult.push(result[key]);
            }

            if (result[key] != this.today && parseInt(key, 10) > keyToday) {
                firstResult.push(result[key]);
            }
        }

        finalResult = firstResult.concat(lastResult);

        return this.addDate(finalResult);
    }

    addDays(days) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+days);
        return tomorrow;
    }

    addDate(result: object): object{
        let descriptionDate = [];
        let finalResult = [];
        let dayWeek = "";
        let elementResult = Object.values(result);

        for (let i = 0; i < 7; i++) {
            let day = this.addDays(i);
            let monthDescription = day.getMonth();
            let dayDescription = (day.getDate() < 10) ? "0"+day.getDate() : day.getDate();
            dayWeek = this.week[day.getDay()];

            let description = dayWeek + "," + dayDescription + " de " + this.getDescriptionMonth(monthDescription);
            descriptionDate.push(description);
        }

        for (const key in descriptionDate) {
            let expr = descriptionDate[key].split(",");
            let dayWeekExpr = expr[0];

            if (parseInt(key, 10) == 0 || parseInt(key, 10) == 1) {
                finalResult.push(result[key] + ", " + expr[1]);
            }

            if (elementResult.includes(dayWeekExpr)) {
                finalResult.push(expr[0] + ", " + expr[1]);
            }
        }

        return finalResult;
    }

    getDescriptionMonth(month: number): string {
        const monthArray = {
            1: 'Janeiro',
            2: 'Fevereiro',
            3: 'Março',
            4: 'Abril',
            5: 'Maio',
            6: 'Junho',
            7: 'Julho',
            8: 'Agosto',
            9: 'Setembro',
            10: 'Outubro',
            11: 'Novembro',
            12: 'Dezembro'
        };

        return monthArray[month + 1];
    }
}