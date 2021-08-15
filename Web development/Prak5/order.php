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
$sumOfPrice = 0;

class Order extends Page
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
        $sql = "SELECT article_id, name, picture, price FROM article";

        $recordset = $this->_database->query($sql);
        if (!$recordset) {
            throw new Exception("Abfrage fehlgeschlagen: " . $this->_database->error);
        }

        $elements = array();
        $data = array();
        while ($record = $recordset->fetch_assoc()) {
            $data["id"] = $record["article_id"];
            $data["name"] = $record["name"];
            $data["picture"] = $record["picture"];
            $data["price"] = $record["price"];
            $elements[$record["article_id"]] = $data; // Array of arrays
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
        $this->generatePageHeader('Bestellung');
        // to do: output view of this page using $data
        echo <<<HTML
            <section>
                <h1>Speisekarte</h1>
HTML;
        foreach ($data as $elemente => $viewdata) { //NOSONAR ignore unused $elemente
            $this->generateSpeisekarte($viewdata);
        }

        echo <<<HTML
        </section>

        <section> 
            <h2>Warenkorb</h2>
        <form action="order.php" id="bestellung" method="POST" accept-charset="UTF-8">
        <select multiple id="cart" tabindex="0" name="cart[]">
        HTML;

        echo <<< HTML
        </select>
            <span id="cost">0</span> €
            <input type="text" id="Adressinput" name="Adresse" placeholder="Ihre Adresse" value="" aria-label="Adresse eingeben" onkeyup="pressed(this)"/>
            <input id="submit_btn" type="submit" name="Bestellen" value="Bestellen" onclick="selectAll('cart')" disabled> 
            </form>
            <button tabindex="1" accesskey="a" onclick="deleteAll('cart')" class="btn-danger">Alle Löschen</button>
            <button tabindex="1" accesskey="a" onclick="deleteIndividuals('cart')" class="btn-warning">Auswahl Löschen</button>
        </section>
        HTML;

        $this->generatePageFooter();
    }

    protected function generateSpeisekarte($data): void
    {
        $ID = $data['id'];
        $name = $data['name'];
        $price = $data['price'];
        $pic = $data['picture'];
        echo <<<HTML
	<article data-price="$price">
            <input class="pizza_img" type="image" src="pizza.png" alt="Pizza $name" onclick="addElement(this)" width="256" height="256" >
            <input type="hidden" value="$ID">
            <h4 >$name</h4>
            <p>$price €</p>
	</article>
	
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
        parent::processReceivedData();
        if (count($_POST)) {
            if (isset($_POST["cart"]) && isset($_POST['Adresse'])) {

                $incAddress = $this->_database->real_escape_string($_POST['Adresse']);
                $cart = $_POST["cart"];

                $sqlPost = "INSERT INTO ordering (address) VALUES ('$incAddress')";

                $this->_database->query($sqlPost);

                $max = $this->_database->insert_id;

                foreach ($cart as $cartid) {
                    $sqlPost = "INSERT INTO ordered_article (ordering_id, article_id) VALUES ('$max' , '$cartid' )";
                    $this->_database->query($sqlPost);
                }

                session_start();
                $_SESSION["Bestellungs_ID"] = $max;
                // Weiterleitung nach PRG-Pattern
            }
            header("HTTP/1.1 303 See Other");
            header("Location: customer.php");
            die();
        }
        // to do: call processReceivedData() for all members
    }

    protected function generateWarenkorb($data): void
    {
        $ID = $data['id'];
        $name = $data['name'];
        $price = $data['price'];
        echo <<<HTML
        <option value="$ID">$name</option>
HTML;
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
            $page = new Order();
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
Order::main();

// Zend standard does not like closing php-tag!
// PHP doesn't require the closing tag (it is assumed when the file ends). 
// Not specifying the closing ? >  helps to prevent accidents 
// like additional whitespace which will cause session 
// initialization to fail ("headers already sent"). 
//? >