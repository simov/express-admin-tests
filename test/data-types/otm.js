
tests.types.otm = function () {

describe('otm', function () {
    before(function (done) {
        client.query(sql.truncate('otm'), done);
    });
    it('should be empty', function (done) {
        $('a[href="/otm"]')[0].click();
        page.load(function () {
            $('.x-table tbody tr').length.should.equal(0);
            $('a[href="/otm/add"]')[0].click();
            page.load(done);
        });
    });
    it('add otm', function (done) {
        async.series([
            function (done) {
                $('[name="view[otm][records][0][columns][name1]"]').val('2012-01-01 10:15');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[otm][records][0][columns][name1]"]').val('2013-01-01 10:15');
                $('[name="action[another]"')[0].click();
                page.load(done);
            },
            function (done) {
                $('.alert-success strong').text().should.equal('Success:');
                $('[name="view[otm][records][0][columns][name1]"]').val('2014-01-01 10:15');
                $('[name="action[save]"')[0].click();
                page.load(done);
            }	
        ], function () {
            win.location.pathname.should.equal('/otm');
            $('.alert-success strong').text().should.equal('Success:');
            $('.x-table tbody tr').length.should.equal(3);
            
            // test this after the pk format bug is fixed

            // $('.x-table tbody tr:eq(0) a').text().should.equal('otm1');
            // $('.x-table tbody tr:eq(1) a').text().should.equal('otm2');
            // $('.x-table tbody tr:eq(2) a').text().should.equal('otm3');
            done();
        });
    });
    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});

}
