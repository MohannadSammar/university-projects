<?php

declare(strict_types=1);
// UTF-8 marker äöüÄÖÜß€
/**
 * Class PageTemplate for the exercises of the EWA lecture
 * Demonstrates use of PHP including class and OO.
 * Implements Zend coding standards.
 * Generate documentation with Doxygen or phpdoc
 *
 * PHP Version 7.4
 *
 * @file     PageTemplate.php
 * @package  Page Templates
 * @author   Bernhard Kreling, <bernhard.kreling@h-da.de>
 * @author   Ralf Hahn, <ralf.hahn@h-da.de>
 * @version  3.0
 */

// to do: change name 'PageTemplate' throughout this file
require_once './Page.php';

/**
 * This is a template for top level classes, which represent
 * a complete web page and which are called directly by the user.
 * Usually there will only be a single instance of such a class.
 * The name of the template is supposed
 * to be replaced by the name of the specific HTML page e.g. baker.
 * The order of methods might correspond to the order of thinking
 * during implementation.
 * @author   Bernhard Kreling, <bernhard.kreling@h-da.de>
 * @author   Ralf Hahn, <ralf.hahn@h-da.de>
 */
class Driver extends Page
{
    // to do: declare reference variables for members 
    // representing substructures/blocks

    /**
     * Instantiates members (to be defined above).
     * Calls the constructor of the parent i.e. page class.
     * So, the database connection is established.
     * @throws Exception
     */
    protected function __construct()
    {
        parent::__construct();
        // to do: instantiate members representing substructures/blocks
    }

    /**
     * Cleans up whatever is needed.
     * Calls the destructor of the parent i.e. page class.
     * So, the database connection is closed.
     */
    public function __destruct()
    {
        parent::__destruct();
    }

    /**
     * Fetch all data that is necessary for later output.
     * Data is returned in an array e.g. as associative array.
     * @return array An array containing the requested data.
     * This may be a normal array, an empty array or an associative array.
     */
    protected function getViewData(): array
    {
        // to do: fetch data for this view from the database
        // to do: return array containing data

        // ID beinhaltet implizit die Anzeigereihenfolge
        $sql = "SELECT a.name, oa.ordered_article_id, oa.ordering_id, oa.article_id, oa.status, o.address 
        FROM ordered_article oa 
        INNER JOIN article a ON a.article_id=oa.article_id 
        INNER JOIN ordering o ON o.ordering_id=oa.ordering_id 
        order by oa.ordering_id";

        $recordset = $this->_database->query($sql);
        if (!$recordset) {
            throw new Exception("Abfrage fehlgeschlagen: " . $this->_database->error);
        }

        $elements = array();
        $data = array();
        while ($record = $recordset->fetch_assoc()) {
            $data["ordered_article_id"] = $record["ordered_article_id"];
            $data["ordering_id"] = $record["ordering_id"];
            $data["article_id"] = $record["article_id"];
            $data["status"] = $record["status"];
            $data["name"] = $record["name"];
            $data["address"] = $record["address"];
            $elements[$record["ordered_article_id"]] = $data; // Array of arrays
        }
        $recordset->free();
        return $elements;
    }

    /**
     * First the required data is fetched and then the HTML is
     * assembled for output. i.e. the header is generated, the content
     * of the page ("view") is inserted and -if available- the content of
     * all views contained is generated.
     * Finally, the footer is added.
     * @return void
     */
    protected function generateView(): void
    {
        $data = $this->getViewData(); // NOSONAR ignore unused $data
        $this->generatePageHeader('Fahrer');
        // to do: output view of this page using $data

        echo <<< HTML
        <section>
            <h1>Fahrer</h1>
        HTML;

        foreach ($data as $elemente => $viewdata) {
            $this->generateDriverItems($viewdata);
        }

        echo <<< HTML
        </section>
        HTML;

        $this->generatePageFooter();
    }

    protected function generateDriverItems($data): void
    {
        $orderedArticleID = $data["ordered_article_id"];
        $orderingID = $data["ordering_id"];
        $articleID = $data["article_id"];
        $status = $data["status"];
        $nameOfPizza = $data["name"];
        $address = htmlspecialchars($data["address"]);
        echo <<< HTML
        <form action="#" id="formid$orderedArticleID" method="POST" accept-charset="UTF-8" name="Bestellungen">
        <input type="hidden" name="driverSubmit" value="driver" />
        <input type="hidden" name="orderedArcticleId" value="$orderedArticleID" />

        <fieldset>
            <legend>Bestellung Nr. $orderedArticleID</legend>
            <p>Name: $nameOfPizza</p>
            <p>Adresse: $address</p>

            <label for="status_$orderedArticleID">Status</label>
            <select name="status" tabindex="0" id="status_$orderedArticleID" onchange="document.forms['formid$orderedArticleID'].submit();" >
        HTML;
        echo '
            <option value="1"' . ($status == 1 ? "selected" : "") . '>Backen</option>
            <option value="2"' . ($status == 2 ? "selected" : "") . '>Gebacken</option>
            <option value="3"' . ($status == 3 ? "selected" : "") . '>Auf dem Weg</option>
            <option value="4"' . ($status == 4 ? "selected" : "") . '>Geliefert</option>';
        echo <<< HTML
        </select>
        </fieldset>
        </form>
        HTML;
    }

    /**
     * Processes the data that comes via GET or POST.
     * If this page is supposed to do something with submitted
     * data do it here.
     * @return void
     */
    protected function processReceivedData(): void
    {
        session_start();
        parent::processReceivedData();
        if (isset($_POST["status"])) {

            $id = $_POST["orderedArcticleId"];
            $currentstatus = $_POST["status"];

            $sql = "UPDATE ordered_article set status=$currentstatus where ordered_article_id=$id";

            $recordset = $this->_database->query($sql);
            if (!$recordset) {

                throw new Exception("Abfrage fehlgeschlagen: " . $this->_database->error);
            }
        }
        // to do: call processReceivedData() for all members
    }

    /**
     * This main-function has the only purpose to create an instance
     * of the class and to get all the things going.
     * I.e. the operations of the class are called to produce
     * the output of the HTML-file.
     * The name "main" is no keyword for php. It is just used to
     * indicate that function as the central starting point.
     * To make it simpler this is a static function. That is you can simply
     * call it without first creating an instance of the class.
     * @return void
     */
    public static function main(): void
    {
        try {
            $page = new Driver();
            header("Refresh:5");
            $page->processReceivedData();
            $page->generateView();
        } catch (Exception $e) {
            header("Content-type: text/html; charset=UTF-8");
            echo $e->getMessage();
        }
    }
}

// This call is starting the creation of the page. 
// That is input is processed and output is created.
Driver::main();

// Zend standard does not like closing php-tag!
// PHP doesn't require the closing tag (it is assumed when the file ends). 
// Not specifying the closing ? >  helps to prevent accidents 
// like additional whitespace which will cause session 
// initialization to fail ("headers already sent"). 
//? >