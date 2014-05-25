
exports.truncate = function (table) {
    switch (true) {
        case this.client.mysql:
            return 'SET FOREIGN_KEY_CHECKS=0;\
                    truncate table `'+table+'`;\
                    SET FOREIGN_KEY_CHECKS=1;';

        case this.client.pg:
            return 'truncate table "'+table+'" cascade;';
        
        case this.client.sqlite:
            return 'delete from `'+table+'`;';
            // DELETE FROM SQLITE_SEQUENCE WHERE name='TableName';
    }
}

exports.client = {}
