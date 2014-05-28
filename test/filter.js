
tests.filter = function () {

describe('filter', function () {
    before(function (done) {
        $('a[href="/tbl"]')[0].click();
        page.load(done);
    });

    it('blank', function (done) {
        $('.glyphicon-filter')[0].click();
        $('[name="filter[otm1_id]"] option').length.should.equal(4);
        $('[name="filter[otm2_id]"] option').length.should.equal(4);
        $('[name="filter[mtm1]"] option').length.should.equal(4);
        $('[name="filter[mtm2]"] option').length.should.equal(4);
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            $('.x-table tbody tr').length.should.equal(2);
            $('.pagination li:eq(0)').hasClass('active').should.equal(true);
            $('.pagination li:eq(1) a').text().should.equal('2');
            done();
        });
    });
    it('otm1', function (done) {
        $('[name="filter[otm1_id]"]').val(1).trigger('chosen:updated');
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            // otm1
            $('[name="filter[otm1_id]"] option:eq(1)').attr('selected').should.equal('selected');
            // results
            $('.x-table tbody tr').length.should.equal(1);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm1');
            $('.pagination li').length.should.equal(0);
            done();
        });
    });
    it('mtm1/1', function (done) {
        $('[name="filter[otm1_id]"]').val('').trigger('chosen:updated');
        // mtm1
        $('[name="filter[mtm1]"] option:eq(1)').attr('selected',true);
        $('[name="filter[mtm1]"]').trigger('chosen:updated');
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            // mtm1
            $('[name="filter[mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            // results
            $('.x-table tbody tr').length.should.equal(2);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(1) td:eq(0) a').text().should.equal('otm3');
            $('.pagination li').length.should.equal(0);
            done();
        });
    });
    it('mtm1/1/3', function (done) {
        // mtm1
        $('[name="filter[mtm1]"] option:eq(3)').attr('selected',true);
        $('[name="filter[mtm1]"]').trigger('chosen:updated');
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            // mtm1
            $('[name="filter[mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="filter[mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            // results
            $('.x-table tbody tr').length.should.equal(2);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(1) td:eq(0) a').text().should.equal('otm2');
            $('.pagination li:eq(0)').hasClass('active').should.equal(true);
            $('.pagination li:eq(1) a').text().should.equal('2');
            done();
        });
    });
    it('mtm1/1/3 - mtm2/2', function (done) {
        // mtm2
        $('[name="filter[mtm2]"] option:eq(2)').attr('selected',true);
        $('[name="filter[mtm2]"]').trigger('chosen:updated');
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            // mtm1
            $('[name="filter[mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="filter[mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="filter[mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            // results
            $('.x-table tbody tr').length.should.equal(2);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(1) td:eq(0) a').text().should.equal('otm2');
            $('.pagination li').length.should.equal(0);
            done();
        });
    });
    it('mtm1/1/3 - mtm2/2 - order', function (done) {
        // order
        $('[name=order]').val('otm1_id').trigger('chosen:updated');
        $('[name=direction][value=desc]')[0].click();
        $('[name="action[filter]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(true);
            // mtm1
            $('[name="filter[mtm1]"] option:eq(1)').attr('selected').should.equal('selected');
            $('[name="filter[mtm1]"] option:eq(3)').attr('selected').should.equal('selected');
            $('[name="filter[mtm2]"] option:eq(2)').attr('selected').should.equal('selected');
            // order
            $('[name=order] option:eq(1)').attr('selected').should.equal('selected');
            $('[name=direction][value=desc]').attr('checked').should.equal('checked');
            // results
            $('.x-table tbody tr').length.should.equal(2);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm2');
            $('.x-table tbody tr:eq(1) td:eq(0) a').text().should.equal('otm1');
            $('.pagination li').length.should.equal(0);
            done();
        });
    });
    it('clear', function (done) {
        // clear
        $('[name="action[clear]"]')[0].click();
        page.load(function () {
            $('form').is(':visible').should.equal(false);
            // results
            $('.x-table tbody tr').length.should.equal(2);
            $('.x-table tbody tr:eq(0) td:eq(0) a').text().should.equal('otm1');
            $('.x-table tbody tr:eq(1) td:eq(0) a').text().should.equal('otm2');
            $('.pagination li:eq(0)').hasClass('active').should.equal(true);
            $('.pagination li:eq(1) a').text().should.equal('2');
            done();
        });
    });

    after(function (done) {
        $('a[href="/"]')[0].click();
        page.load(done);
    });
});

}
